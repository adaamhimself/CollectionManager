import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User = {
    userName: "",
    password: "",
    _id: null
  }

  public warning: string;

  public loading: boolean = false;

  constructor(private routing: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // verification calls to an auth service will be done here
    this.routing.navigate(["/home"]);
  }

}
