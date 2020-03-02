import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

declare var M:any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {

  constructor( public userService : UserService, private router: Router ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  addUser(form: NgForm){

    if(form.value._id){
      this.userService.updateInstance(form.value)
        .subscribe(res =>{
          this.resetForm(form);
          M.toast({html: 'Usuario modificado'});
          this.getUsers();
        });
    }else{
      this.userService.createInstance(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Usuario creado'});
        this.getUsers();
      });
    }
      
  }

  getUsers(){
    this.userService.getList()
      .subscribe(res => {
        this.userService.userList = res as User[];
      });
  }

  resetForm(form ?: NgForm){
    if(form){
      form.reset();
      this.userService.selectedUser = new User();
    }
  }

  editUser(user: User){
    this.userService.selectedUser = user;
  }

  deleteUser(user: User){
    this.userService.deleteInstance(user._id)
      .subscribe(res => {
        M.toast({html: 'Usuario eliminado'});
        this.getUsers();
      });

  }

  login(form: NgForm){
    console.log(form.value);
    this.userService.login(form.value)
      .subscribe(res => {
        this.userService.selectedUser = res as User;
        M.toast({html: 'Usuario Logeado'});
        this.router.navigate(['/users/'+this.userService.selectedUser._id]);
      });
  }
}
