import { Injectable } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IUser } from 'src/app/models/user.model';

@Injectable()
export class LoginService {
  private _user: IUser | null = null;

  get admin(): boolean {
    return this._user?.role === 'admin';
  }

  get loggedIn(): boolean {
    return !!this._user;
  }

  get user(): IUser {
    return this._user!!;
  }

  constructor(
    private readonly userService: UserService,
  ) {
  }

  login(username: string): Observable<boolean> {
    return this.userService.findByUsername(username).pipe(
      tap(this.saveUser),
      map(Boolean),
    );
  }

  logout(): void {
    localStorage.removeItem('username');
  }

  restoreUser(): Observable<IUser> {
    const username = localStorage.getItem('username');

    return username ? this.login(username): of({} as any);
  }

  private saveUser = (user: IUser | null): void => {
    if (user) {
      this._user = user;
      localStorage.setItem('username', user.username);
    }
  };
}
