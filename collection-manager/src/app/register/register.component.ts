import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerUser: RegisterUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: ""
  }

  public warning: string;
  public loading: boolean = false;
  public success: boolean = false;

  // add auth service after
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // register services that comunicate with the database will be called here
    this.success = true;
    this.warning = null;
    this.loading = false;
  }
}


