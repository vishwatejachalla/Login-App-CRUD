import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../service/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  // user:any;
  loginForm: FormGroup;
  userArray: [];
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, []),
    });
    // this.user=this.userService.getAllUsers()
    // console.log("*****************",this.user)
  }

  save() {
    this.userService.getUserByMail(this.loginForm.value).subscribe((data) => {
      this.userArray = data;
      console.log(this.userArray);
      if (this.userArray!=null) {
        this.router.navigate(["/userdetails"]);
      } else {
        console.log("Enter Valid Details");
      }
    });
  }
}
