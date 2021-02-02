import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDataRoutingModule } from './user-data-routing.module';
import { UserDataComponent } from './user-data.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';


@NgModule({
  declarations: [UserDataComponent],
  imports: [
    CommonModule,
    UserDataRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    FormsModule,
    NzButtonModule,
    NzDrawerModule,
    NzSkeletonModule,
    NzModalModule,
    NzMessageModule,
    NzPaginationModule,
    NzInputModule
  ]
})
export class UserDataModule { }
