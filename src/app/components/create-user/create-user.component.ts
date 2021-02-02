import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserDataService } from 'src/app/Services/user-data.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';

interface IModelSave{
  name: string;
  email: string;
  password: string;
  role: string;
  image: string;
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
  environment = environment
  save_model: any;
  passwordVisible = false;
  password?: string;
  name:string = ""
  user_data: any[] = []
  loading = false;
  avatarUrl?: string;

  constructor(
    private userDataService: UserDataService,
    private nzDrawerRef: NzDrawerRef,
    private message: NzMessageService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.save_model = {
      ...this.model
    }
  // this.save_model = this.model
  }

  create() {
    let model: IModelSave = {
      name: this.save_model.name,
      email: this.save_model.email,
      password: this.save_model.password,
      role: this.save_model.role,
      image: this.save_model.image
    }
    console.log(model)

    if(!model.name.trim()){
      this.message.create('error', 'กรุณากรอกชื่อ');
      return
    }
     
    if(!model.email.trim() || !re.test(model.email)){
      this.message.create('error', 'กรุณากรอก email');
      return
    }
    
    // return
    if(this.state == "create"){
      this.userDataService.create(model).then((res:any)=>{
      
        this.name = ""
        // this.getAllUserdata()
        this.nzDrawerRef.close(true)
      })
      .catch((err:any)=>{
  
      })
    }
  }

  update(id:string) {
    let model = {
      name: this.save_model.name,
      email: this.save_model.email,
      password: this.save_model.password
    }
    console.log(model)
    // return
    if(this.state == "edit"){
      this.userDataService.update(model, id).then((res:any)=>{
      
        // this.name = ""
        // this.getAllUserdata()
        this.nzDrawerRef.close(true)
      })
      .catch((err:any)=>{
  
      })
    }
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    console.log(info);
    
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.save_model.image = info.file.response.patch
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }
    
}


  
  

