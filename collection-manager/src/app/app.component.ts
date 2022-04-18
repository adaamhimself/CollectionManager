import { Component, Input } from '@angular/core';
import {
  NavigationStart,
  Router,
  Event,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Collection Manager';
  token: any | null = null;
  role: string;
  roleSub: any;
  url: any;
  isHome: boolean;

  isHomePage: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // listen to events from Router
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // event is an instance of NavigationEnd, get url!
        this.url = event.urlAfterRedirects;
        // check if the current page is the home page
        if (this.url === '/') {
          this.isHome = false;
        } else {
          this.isHome = true;
        }
      }
    });
  }
  logout() {
    //clear the token
    this.auth.clearToken();
    //redirect to the login page
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.token = this.auth.readToken();
      }
    });
    this.roleSub = this.auth.isAdministrator().subscribe((response) => {
      this.role = response;
    });
  }

  checkIsHome(): void {
    if (this.router.url === '/') {
      console.log('at home');
    } else {
      console.log('not home');
    }
  }
}
