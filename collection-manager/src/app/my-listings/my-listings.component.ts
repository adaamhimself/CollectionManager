import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { ListingDisplayInfo } from '../listing-display-info';
import { ListingService } from '../listing.service';

@Component({
    selector: 'app-my-listings',
    templateUrl: './my-listings.component.html',
    styleUrls: ['./my-listings.component.css']
})
export class MyListingsComponent implements OnInit {
    public postings: Array<ListingDisplayInfo> = [];//currently shown postings
    public gridColumns = 3;
    public warning: string;
    private listingSub: any = null;
    private itemSub: any = null;

    constructor(private listingService: ListingService, private itemService: ItemService) { }

    ngOnInit(): void {
        //retrieve all postings of the logged-in user
        this.listingSub = this.listingService.getMyListings().subscribe(
            (response) => {
                this.showPostings(response);
            },
            (error) => {
                this.warning = error.error;
            }
        );
    }

    showPostings(listings): void {
        //if nothing was retrieved from the service
        if (!(listings && listings.length > 0)) {
            console.log("Nothing returned from listing service. Likely nothing there but may be an error.");
            return;
        }
        //for each market posting
        listings.forEach(listing => {
            //fix types that are stored with different names
            if (listing.listing_type == "sale") listing.listing_type = "selling";
            if (listing.listing_type == "trade") listing.listing_type = "trading";
            //1. get the item instance it's linked to (using the field item_id)
            this.itemSub = this.itemService.getItemById(listing.item_id).subscribe(
                (item) => {
                    //2. convert the listing into PostingCardInfo (passing the listing and item) and push it to the array
                    if (item) this.postings.push(new ListingDisplayInfo(listing, item));
                },
                (error) => {
                    this.warning = error.error;
                }
            );
        });
    }

    //unsubscribes upon being destroyed
    ngOnDestroy() {
        if (this.listingSub) this.listingSub.unsubscribe();
        if (this.itemSub) this.itemSub.unsubscribe();
    }
}