import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../User';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User = {
    username: "",
    password: "",
  }

  public warning: string;
  public loading: boolean = false;
  private loginSub: any;

  constructor(private auth: AuthService, private routing: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // verification calls to an auth service will be done here
    this.loading = true;
    this.loginSub = this.auth.login(this.user).subscribe(
      response => {
        this.loading = false;
        this.auth.setToken(response.token);
      }, error => {
        this.warning = error.error;
        this.loading = false;
        console.log(error.error);
      }
    )
    //this.routing.navigate(["/home"]);
  }

  ngOnDestroy(): void {
    //this.loginSub.unsubscribe();
  }

}
