import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from 'src/app/modules/user-form/user-form.component';
import { UserFormModule } from 'src/app/modules/user-form/user-form.module';

const routes: Routes = [
  {
    path: 'edit/:id',
    component: UserFormComponent,
  },
  {
    path: 'create',
    component: UserFormComponent,
  },
];

@NgModule({
  imports: [
    UserFormModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class UserFormRoutingModule {
}
