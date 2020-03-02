import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User;
  userList : User[];

  readonly URL_API = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { 
    this.selectedUser = new User();
  };

  getList(){
    return this.http.get(this.URL_API);
  }

  createInstance(instance : User){
    return this.http.post(this.URL_API, instance);
  }

  updateInstance(instance : User){
    return this.http.put(this.URL_API + '/'+`${instance._id}`, instance);
  }

  deleteInstance(_id : string){
    return this.http.delete(this.URL_API+'/'+_id);
  }

  login(instance :  User){
    return this.http.post(this.URL_API+'/login', instance)
  }
}
