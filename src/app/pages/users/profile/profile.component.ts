import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/Services/user-data.service'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private userDataService: UserDataService,
    private activatedRoute: ActivatedRoute) { 

    //   this.activatedRoute.queryParams.subscribe(params => {
    //     let user_id = params['id'];
    //     console.log(user_id);

    //     this.getByID(user_id)
    // })

    this.getUserData()
  }

  userdata: any = []

  ngOnInit(): void {
  }

  async getUserData() {
    this.userDataService.getUserData().then((res: any) => {
      this.userdata = res

      console.log(this.userdata);

      
    }).catch((err) => {

    })
  }

  

}
