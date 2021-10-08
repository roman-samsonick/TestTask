import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { LoginModule } from 'src/app/modules/login/login.module';
import { LoginGuard } from 'src/app/guards/login.guard';
import { AdminGuard } from 'src/app/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [LoginGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/user-overview/user-overview-routing.module')
          .then(m => m.UserOverviewRoutingModule),
      },
      {
        path: 'admin',
        canActivate: [AdminGuard],
        loadChildren: () => import('./modules/user-form/user-form-routing.module')
          .then(m => m.UserFormRoutingModule),
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [
    LoginModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [LoginGuard, AdminGuard],
})
export class AppRoutingModule { }
