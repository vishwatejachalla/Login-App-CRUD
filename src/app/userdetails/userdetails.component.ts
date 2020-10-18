import { formatDate } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from '../user.entity';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  userForm: FormGroup;
  user:User = new User();
  now =new Date();
  date:string;
  userArray:[];
  constructor(private userService:UserService) { 
  }

  ngOnInit() {
    this.userForm =new FormGroup({
      'userName': new FormControl(null,[]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, []),
      'description': new FormControl(null,[]),
      'id':new FormControl(null,[])
    })
  }

  save(){
    this.date=formatDate(this.now,"dd-MM-yyyy, hh:mm:ss a", 'en-US', '+0530');
    this.user.name=this.userForm.value.userName;
    this.user.email=this.userForm.value.email;
    this.user.password=this.userForm.value.password;
    this.user.description=this.userForm.value.description;
    this.user.createdBy=this.userService.username;
    this.user.createdDate=this.date;
    this.user.updatedBy="No Updation";
    this.user.updatedDate="No Updation";
    this.userService.postUser(this.user).subscribe((data)=>{
      console.log(data)
    })
  }

  display(){
    this.userService.getAllUsers().subscribe((data)=>{
      this.userArray=data;
    })
  }
  update(){
    this.date=formatDate(this.now,"dd-MM-yyyy, hh:mm:ss a", 'en-US', '+0530');
    this.user._id=this.userForm.value.id;
    this.user.name=this.userForm.value.userName;
    this.user.email=this.userForm.value.email;
    this.user.password=this.userForm.value.password;
    this.user.description=this.userForm.value.description;
    this.user.createdBy="Hello"
    this.user.createdDate="User"
    this.user.updatedBy=this.userService.username;
    this.user.updatedDate=this.date;
    console.log(this.userForm.value.id,"---------------",this.user._id)
    this.userService.updateUser(this.user,this.userForm.value.id).subscribe((data)=>{
      console.log(data);
    })
  }
  delete(){
    this.userService.deleteUser(this.userForm.value.id).subscribe((data)=>{
      console.log(data)
    })
  }
}
