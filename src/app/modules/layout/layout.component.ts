import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass'],
})
export class LayoutComponent {
  readonly langControl = new FormControl(
    this.translateService.defaultLang === 'fr',
  );

  constructor(
    private readonly translateService: TranslateService,
    private readonly toastService: ToastrService,
    private readonly loginService: LoginService,
    private readonly router: Router,
  ) {
  }

  changeLanguage(isFrench: boolean): void {
    this.translateService.use(
      isFrench ? 'fr' : 'en',
    );
    localStorage.setItem('lang', this.translateService.currentLang);

    const message = isFrench
      ? this.translateService.instant('langChangedToFr')
      : this.translateService.instant('langChangedToEn');

    this.toastService.success(message);
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['login']);
  }
}
