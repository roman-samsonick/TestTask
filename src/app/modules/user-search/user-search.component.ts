import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { Observable, zip } from 'rxjs';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.sass']
})
export class UserSearchComponent implements OnInit {
  readonly searchControl = new FormControl({});

  searchUsers: IUser[] = [];

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      filter(this.filterStringValues),
      filter(Boolean as any),
      map(this.splitFirstAndLastName),
      switchMap(this.fetchSearchUsers),
    ).subscribe(this.setSearchUsers);

    this.searchControl.valueChanges.pipe(
      filter(this.filterUserValues),
    ).subscribe(this.goToDetailsPage);
  }

  getUserName(user: IUser | string): string {
    return typeof user === 'object'
      ? user.firstName
      : user;
  }

  private filterStringValues(value: any): boolean {
    return typeof value === 'string';
  }

  private filterUserValues(value: any): boolean {
    return typeof value === 'object';
  }

  private splitFirstAndLastName(value: string): string[] {
    return value.split(' ');
  }

  private intersectSearchResults([usersFirst, usersSecond]: IUser[][]): IUser[] {
    usersSecond.forEach(user => {
      if (!usersFirst.some(u => u.id === user.id)) {
        usersFirst.push(user);
      }
    });

    return usersFirst;
  }

  private fetchSearchUsers = (firstAndLastNames: string[]): Observable<IUser[]> => {
    return firstAndLastNames.length === 2
      ? this.userService.findByPartialName(firstAndLastNames[0], firstAndLastNames[1])
      : zip(
        this.userService.findByPartialName(firstAndLastNames[0]),
        this.userService.findByPartialName(undefined, firstAndLastNames[0]),
      ).pipe(map(this.intersectSearchResults));
  };

  private setSearchUsers = (users: IUser[]): void => {
    this.searchUsers = users;
  };

  private goToDetailsPage = (user: IUser) => {
    this.router.navigate(['details', user.id]);
  };
}
