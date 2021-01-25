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

  model_search = {
    name: "",
    email: "",
    password: "",
    created_at: "",
    updated_at: "",
    role: "",
    page: 1,
    perpage: 10,
    search: ""
  }
  listusers: any[] = []
  isLoading = true
  count: any = null
  page = null

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

    let res: any = null
    try {
      res = await this.userDataService.getAll({})
      console.log(res);

      this.listusers = res.data;
      this.count = res.count;

    } catch (err) {

    }

    // if (res.length == 0) {
    //   console.log('sdsddd')
    // }

    this.isLoading = false

    // .then((res: any) => {
    //   this.model_search = res
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
          name: "",
          email: "",
          password: ""
        }
      },
      nzWidth: '40%',
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
      nzContent: 'Are you sure to delete?',
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

  onPageIndexChange($event) {

    this.model_search.page = $event

    this.userDataService.getAll(this.model_search).then((res: any) => {

      this.count = res.count;
      this.listusers = res.data
      console.log(res);
      console.log(this.model_search)

    })
      .catch((err: any) => {

      })

  }

  Selected() {

    this.userDataService.getAll(this.model_search).then((res: any) => {
      console.log(res);

      this.count = res.count;
      this.listusers = res.data

    })
      .catch((err: any) => {

      })

    // this.isLoading = false
  }
}
