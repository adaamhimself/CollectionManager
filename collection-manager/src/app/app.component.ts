import { Component } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Collection Manager';
    token: any | null = null;
    constructor(private auth: AuthService, private router: Router) { }
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
    }
}
