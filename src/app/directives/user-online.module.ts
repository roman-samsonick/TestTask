import { NgModule } from '@angular/core';
import { UserOnlineDirective } from 'src/app/directives/user-online.directive';

@NgModule({
  declarations: [
    UserOnlineDirective,
  ],
  exports: [
    UserOnlineDirective,
  ],
})
export class UserOnlineModule {
}
