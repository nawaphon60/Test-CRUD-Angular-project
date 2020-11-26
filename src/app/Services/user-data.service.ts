import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const api_url = 'https://5fb61cd036e2fa00166a4ec1.mockapi.io/api/v1/'

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(
    private _http: HttpClient
  ) { }

  getAll(){
    return this._http.get(`${api_url}/user_data`).toPromise()
  }

  getByID(id: any) {
    return this._http.get(`${api_url}/user_data/${id}`).toPromise()
  }

  deleteByID(id: any) {
    return this._http.delete(`${api_url}/user_data/${id}`).toPromise()
  }

  create(data: any) {
    return this._http.post(`${api_url}/user_data`, data).toPromise()
  }

  update(data: any, id: any){
    return this._http.put(`${api_url}/user_data/${id}`, data).toPromise()
  }


}
