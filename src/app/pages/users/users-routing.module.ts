import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenGuard } from '@app/authen.guard';

import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '', component: UsersComponent,
    children: [
      { path: '', redirectTo: 'user-data', pathMatch: "full" },
      { canActivate:[AuthenGuard], path: 'user-data', loadChildren: () => import('./user-data/user-data.module').then(m => m.UserDataModule) },
      { path: '', redirectTo: 'profile', pathMatch: "full" },
      { path: 'profile', loadChildren: () => import('../users/profile/profile.module').then(m => m.ProfileModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
