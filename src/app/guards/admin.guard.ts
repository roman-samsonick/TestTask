import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly loginService: LoginService,
  ) {
  }

  canActivate(): boolean {
    return this.loginService.admin;
  }
}
