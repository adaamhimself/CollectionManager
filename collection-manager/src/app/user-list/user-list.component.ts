import { Component, OnInit } from '@angular/core';
import { DevService } from '../dev.service';
import { UserDetails } from '../UserDetails';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    public allUsers:Array<UserDetails> = [];//all
    public users:Array<UserDetails> = [];//currently showing
    public warning: string;
    public gridColumns = 4;
    public message = "Looks like there are no users. This may be an error.";
    public query = "";
    public userCount = 0;
    private devSub: any = null;

    constructor(private devService:DevService) { }

    ngOnInit(): void {
        this.devSub = this.devService.getListOfUsers().subscribe(
            (response) => {
                console.log("Users:",response);
                this.allUsers = response;
                this.users = response;
            },
            (error) => {
                this.warning = error.error;
            }
        );
    }

    //update the shown users using the search query
    search(): void {
        //default message
        this.message = "Looks like there are no users. This may be an error.";
        if (this.query == ""){
            //show all users when there's no query
            this.users = this.allUsers;
            return;
        }
        //clear the currently shown users
        this.users = [];
        //get all users that fit the query
        for (let user of this.allUsers){
            //add if the username includes the query (not case sensitive)
            if (user.username.toLowerCase().includes(this.query.toLowerCase())){
                this.users.push(user);
            }
        }
        //update the count
        this.userCount = this.users.length;
        //update message if no users were found
        if (this.userCount == 0){
            this.message = "No users fit that search query. Check spelling or try a simpler query."
        }
    }

    //unsubscribe upon being destroyed
    ngOnDestroy() {
        if (this.devSub) this.devSub.unsubscribe();
    }
}
