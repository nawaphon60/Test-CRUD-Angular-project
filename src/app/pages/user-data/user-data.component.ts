import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserDataService } from 'src/app/Services/user-data.service'
import { CreateUserComponent } from 'src/app/components/create-user/create-user.component'
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit, AfterViewInit {

  user_data: any[] = []
  isLoading = true

  constructor(
    private userDataService: UserDataService,
    private nzDrawerService: NzDrawerService,
    private nzModalService: NzModalService
  ) { }

  ngOnInit(): void {
    // this.getAllUserdata()
  }

  ngAfterViewInit() {
    this.getAllUserdata()
  }

  async getAllUserdata() {

    let res: any[] = []

    try {
      res = await this.userDataService.getAll() as any[]
      this.user_data = res
    } catch (err) {

    }

    if (res.length > 0) {
      console.log('sdsddd')
    }

    this.isLoading = false

    // .then((res: any) => {
    //   this.user_data = res
    // })
    // .catch((err: any) => {

    // })
  }

  async editUser(obj: any) {

    let { CreateUserModule } = await import('@app/components/create-user/create-user.module')

    const drawerRef = this.nzDrawerService.create({
      nzTitle: 'Edit User',
      nzFooter: null,
      nzContent: new CreateUserModule().getComponents(),
      nzContentParams: {
        state: "edit",
        model: obj
      },
      nzWidth: '40%',
      nzBodyStyle: {

      },
      nzWrapClassName: 'TESTT YYYY'
    })
      .afterClose.subscribe((r: boolean) => {
        drawerRef.unsubscribe()
        console.log('Drawer(Template) close');
        if (r) {
          this.getAllUserdata()
        }
      });
  }

  async createUser() {

    let { CreateUserModule } = await import('@app/components/create-user/create-user.module')

    const drawerRef = this.nzDrawerService.create({
      nzTitle: 'Create User',
      nzFooter: null,
      nzContent: new CreateUserModule().getComponents(),
      nzContentParams: {
        state: "create",
        model: {
          id: null,
          username: "",
          email: "",
          password: ""
        }
      },
      nzWidth: '40%',
      nzBodyStyle: {

      },
      nzWrapClassName: 'TESTT YYYY'
    })
      .afterClose.subscribe((r: boolean) => {
        drawerRef.unsubscribe()
        console.log('Drawer(Template) close');
        if (r) {
          this.getAllUserdata()
        }
      });
  }

  deleteUser(id: number) {

    this.nzModalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Bla bla ...',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnOk: () => {

        this.userDataService.deleteByID(id).then((res: any) => {
          this.getAllUserdata()
        })
          .catch((err: any) => {

          })

          
      }
    });


  }

}
