import { CanActivateChild, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivateChild {
  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
  ) {
  }

  canActivateChild(): Observable<boolean> {
    return this.loginService.restoreUser()
      .pipe(map(this.verifyLogin));
  }

  private verifyLogin = (): boolean => {
    if (!this.loginService.loggedIn) {
      this.router.navigate(['login']);
    }

    return this.loginService.loggedIn;
  };
}
