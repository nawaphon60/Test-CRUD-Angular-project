import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: 'user-data', loadChildren: () => import('./pages/users/user-data/user-data.module').then(m => m.UserDataModule) }, 
  // { path: 'create-user', loadChildren: () => import('./components/create-user/create-user.module').then(m => m.CreateUserModule) }, 
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  // { path: 'profile', loadChildren: () => import('./pages/users/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
