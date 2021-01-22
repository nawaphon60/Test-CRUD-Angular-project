import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'user-data', loadChildren: () => import('./pages/user-data/user-data.module').then(m => m.UserDataModule) }, 
  { path: 'create-user', loadChildren: () => import('./components/create-user/create-user.module').then(m => m.CreateUserModule) }, 
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
