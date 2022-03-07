import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../Item';
import { ItemService } from '../item.service';
import { Listing } from '../listing';
import { ListingDisplayInfo } from '../listing-display-info';
import { ListingService } from '../listing.service';

@Component({
    selector: 'app-view-posting',
    templateUrl: './view-posting.component.html',
    styleUrls: ['./view-posting.component.css']
})
export class ViewPostingComponent implements OnInit {
    public posting: ListingDisplayInfo = null;
    public postType: String = "";
    public warning: string;
    public chatRoute: String = "/chat";//multiple html locations use this

    private listingSub: any = null;
    private itemSub: any = null;
    private deleteSub: any = null;

    constructor(private routing: Router, private route: ActivatedRoute, private listingService: ListingService, private itemService: ItemService) { }

    ngOnInit(): void {
        let id: String = this.route.snapshot.params['id'];
        this.listingSub = this.listingService.getListingById(id).subscribe(
            (response) => {
                this.showPosting(response);
            },
            (error) => {
                this.warning = error.error;
            }
        )
    }

    //handles showing the retrieved listing
    showPosting(listing: any) {
        console.log("viewing: ", listing);
        //if nothing was retrieved from the service
        if (!listing) {
            console.log("Nothing returned from listing service. Likely nothing there but may be an error.");
            return;
        }
        //get the item instance it's linked to (using the field item_id)
        this.itemSub = this.itemService.getItemById(listing.item_id).subscribe(
            (item) => {
                //clear the displayed posting
                this.posting = null;
                //change the displayed post type
                this.postType = listing.listing_type;
                //fix types that are stored with different names
                if (this.postType == "trade") this.postType = "trading";
                //convert the listing into PostingViewInfo (passing the listing and item) and set the shown posting
                this.posting = new ListingDisplayInfo(listing, item);
            },
            (error) => {
                this.warning = error.error;
            }
        );
    }

    //unsubscribes upon being destroyed
    ngOnDestroy() {
        if (this.listingSub) this.listingSub.unsubscribe();
        if (this.itemSub) this.itemSub.unsubscribe();
        if (this.deleteSub) this.deleteSub.unsubscribe();
    }
}