import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Injectable()
export class UserResolverService implements Resolve<User> {
  constructor(
    private readonly loginService: LoginService,
  ) {
  }

  resolve(): Observable<User> {
    return this.loginService.restoreUser();
  }
}
