import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  readonly usernameControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly translateService: TranslateService,
  ) {
  }

  login(): void {
    this.loginService.login(this.usernameControl.value)
      .subscribe(succeed => {
        if (succeed) {
          this.router.navigate(['']);
        } else {
          this.setUsernameNotFoundError();
        }
      });
  }

  private setUsernameNotFoundError(): void {
    this.usernameControl.setErrors({
      usernameNotFoundError: this.translateService.get('usernameNotFound'),
    });
    this.usernameControl.valueChanges.pipe(first())
      .subscribe(() => this.usernameControl.setErrors(null));
  }
}
