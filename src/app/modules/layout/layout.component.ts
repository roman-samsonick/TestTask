import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';

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
  ) {
  }

  changeLanguage(isFrench: boolean): void {
    this.translateService.use(
      isFrench ? 'fr' : 'en',
    );
    localStorage.setItem('lang', this.translateService.currentLang);
  }
}
