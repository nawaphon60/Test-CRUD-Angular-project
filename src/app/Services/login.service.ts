import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

const api_url = 'http://localhost:3000/api'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private _http:HttpClient
  ) { }

  login(data:any) {
    return this._http.post(`${api_url}/authen/login`, {
      // domain: 'localhost:3000',
      email: data.email,
      password: data.password
    }).toPromise()
  }
}
