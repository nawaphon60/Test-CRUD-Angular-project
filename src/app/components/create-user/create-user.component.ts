import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserDataService } from 'src/app/Services/user-data.service';

interface IModelSave{
  username: string;
  email: string;
  password: string;
}

const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  @Input() state: string = ""
  @Input() model:any

  save_model:any
  passwordVisible = false;
  password?: string;
  username:string = ""
  user_data: any[] = []

  constructor(
    private userDataService: UserDataService,
    private nzDrawerRef: NzDrawerRef,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.save_model = {
      ...this.model
    }
    // this.save_model = this.model
  }

  create() {
    let model: IModelSave = {
      username: this.save_model.username,
      email: this.save_model.email,
      password: this.save_model.password
    }
    console.log(model)
    if(!model.username.trim()){
      this.message.create('error', 'fddgfdgdfg');
      return
    }
     
    if(!model.email.trim() || !re.test(model.email)){
      this.message.create('error', model.email);
      return
    }
    // return
    if(this.state == "create"){
      this.userDataService.create(model).then((res:any)=>{
      
        this.username = ""
        // this.getAllUserdata()
        this.nzDrawerRef.close(true)
      })
      .catch((err:any)=>{
  
      })
    }
  }

  update(id:number) {
    let model = {
      username: this.save_model.username,
      email: this.save_model.email,
      password: this.save_model.password
    }
    console.log(model)
    // return
    if(this.state == "edit"){
      this.userDataService.update(model, id).then((res:any)=>{
      
        // this.username = ""
        // this.getAllUserdata()
        this.nzDrawerRef.close(true)
      })
      .catch((err:any)=>{
  
      })
    }
  }
  
}

  
  

