import { Component, HostBinding, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.sass'],
})
export class FormFieldComponent {
  @Input() control!: FormControl;
  @Input() placeholder!: string;
  @Input() type = 'text';
  @Input() title!: string;
  @Input() suffixIcon?: string;

  @HostBinding('class.text-field') textFieldClass = true;

  constructor(
    private readonly translateService: TranslateService,
  ) {
  }

  get errors(): string {
    const errors = this.control.errors!;
    const keys = Object.keys(errors);

    if (!keys.length) {
      return '';
    }

    return keys.map(
      key => this.translateService.instant(`errors.${key}`, errors[key])
    ).join(';\n');
  }
}
