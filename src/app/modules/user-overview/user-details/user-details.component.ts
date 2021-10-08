import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.sass'],
})
export class UserDetailsComponent implements OnInit {
  user!: IUser;

  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
  ) {
  }

  get id(): string {
    return this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.userService.findById(this.id).subscribe(user => this.user = user!);
  }

}
