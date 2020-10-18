import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../login.entity';
import { User } from '../user.entity';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  username:string;
  getAllUsers():Observable<any>{
    console.log(this.httpClient.get(environment.baseUrl))
    return this.httpClient.get<any>(environment.baseUrl);
  }
  postUser(user:User):Observable<any>{
    return this.httpClient.post(environment.baseUrl,user);
  }
  updateUser(user:User,id:number):Observable<any>{
    // return this.httpClient.patch(environment.baseUrl+user._id,user);
    return this.httpClient.put(environment.baseUrl+id,user);
  }
  deleteUser(id:number):Observable<any>{
    return this.httpClient.delete(environment.baseUrl+'delete/'+id);
  }
  getUserByMail(login: Login):Observable<any>{
    this.username=login.email;
    return this.httpClient.get(environment.baseUrl+"login/"+login.email+"/"+login.password);
  }
}
