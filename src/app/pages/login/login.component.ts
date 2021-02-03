import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {
    email: "nawaphon@gmail.com",
    password: "1234"
  }

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    let model = {
      email : this.loginUserData.email,
      password : this.loginUserData.password
    }

    this.loginService.login(model).then((res:any)=>{ 
      
      localStorage.setItem('token', JSON.stringify(res))

      
      this.router.navigate(['/users/user-data'])

    }).catch((err:any)=>{

    })
  }

}
