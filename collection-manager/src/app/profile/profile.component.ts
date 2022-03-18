import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionService } from '../collection.service';
import { UserService } from '../user.service'
import { UserDetails } from '../UserDetails';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public user: UserDetails = null;
    public viewingSelf = false;
    public collectionAmount = -1;
    public warning: string;

    private userSub: any = null;
    private collectionSub: any = null;

    constructor(private route: ActivatedRoute, private userService: UserService, private collectionService: CollectionService) { }

    ngOnInit(): void {
        let id: String = this.route.snapshot.params['id'];
        //if the id is "me"...
        if (id === "me") {
            //get the logged-in user details
            this.userSub = this.userService.getMyDetails().subscribe(
                (response) => {
                    console.log(response);
                    this.user = response;
                    this.viewingSelf = true;
                    this.getCollections();
                },
                (error) => {
                    this.warning = error.error;
                }
            );
        } else {
            //otherwise, retrieve the user details using the id
            this.userSub = this.userService.getUserDetails(id).subscribe(
                (response) => {
                    console.log(response);
                    this.user = response;
                },
                (error) => {
                    this.warning = error.error;
                }
            );
        }
    }
    
    //for logged in user only
    getCollections(): void {
        //get number of collections
        this.collectionSub = this.collectionService.getMyCollections().subscribe(
            (collections) => {
                this.collectionAmount = collections.length;
            },
            (error) => {
                this.warning = error.error;
                this.collectionAmount = -2;
            }
        );
    }

    //unsubscribe upon being destroyed
    ngOnDestroy() {
        if (this.collectionSub) this.collectionSub.unsubscribe();
        if (this.userSub) this.userSub.unsubscribe();
    }
}
