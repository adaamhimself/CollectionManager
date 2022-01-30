import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'collection-manager';
    token: any | null = null;
    constructor(private router: Router) { }
    logout() {
        //clear the token
        
        //redirect to the login page
        this.router.navigate(['/login']);
    }
}
