import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// const api_url = 'https://5fb61cd036e2fa00166a4ec1.mockapi.io/api/v1/'
const api_url = 'http://localhost:3000/api'

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(data: any){
    return this.http.post(`${api_url}/users/search`, data).toPromise()
  }

  getByID(id: any) {
    return this.http.get(`${api_url}/user_data/${id}`).toPromise()
  }

  // deleteByID(id: any) {
  //   return this.http.delete(`${api_url}/user_data/${id}`).toPromise()
  // }
  
  deleteByID(id: any) {

    let token = localStorage.getItem('token')
    let token_json = JSON.parse(token)

    let _header = {
    headers: {
      authorization: `Bearer ${token_json.token}`
    }
  }
    
    return this.http.delete(`${api_url}/users/delete/${id}`, _header).toPromise()
  }

  // create(data: any) {
  //   return this.http.post(`${api_url}/user_data`, data).toPromise()
  // }

  /* connect node */
  create(data: any) {
    return this.http.post(`${api_url}/users/create`, data).toPromise()
  }

  // update(data: any, id: any){
  //   return this.http.put(`${api_url}/user_data/${id}`, data).toPromise()
  // }
  
  update(data: any, id: string){

    let token = localStorage.getItem('token')
    let token_json = JSON.parse(token)

    let _header = {
    headers: {
      authorization: `Bearer ${token_json.token}`
    }
  }
    return this.http.put(`${api_url}/users/update/${id}`, data, _header).toPromise()
  }

}
