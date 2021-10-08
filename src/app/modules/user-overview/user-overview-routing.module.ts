import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from 'src/app/modules/user-overview/user-list/user-list.component';
import { UserDetailsComponent } from 'src/app/modules/user-overview/user-details/user-details.component';
import { UserOverviewModule } from 'src/app/modules/user-overview/user-overview.module';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
  },
  {
    path: 'details/:id',
    component: UserDetailsComponent,
  },
];

@NgModule({
  imports: [
    UserOverviewModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class UserOverviewRoutingModule {
}
