import { Component, OnInit } from '@angular/core';
import { Item } from '../Item';
import { ItemService } from '../item.service';
import { Listing } from '../listing';
import { ListingDisplayInfo } from '../listing-display-info';
import { ListingService } from '../listing.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public promotedPostings: Array<ListingDisplayInfo> = [];//promoted postings
    public warning: string;
    public gridColumns = 3;

    private listingSub: any = null;
    private itemSub: any = null;

    constructor(private listingService: ListingService, private itemService: ItemService) { }

    ngOnInit(): void {
        //retrieve all selling postings
        this.listingSub = this.listingService.getAllPromotedListings().subscribe(
            (response) => {
                response.forEach(listing => {
                    this.addPosting(listing);
                });
            },
            (error) => {
                this.warning = error.error;
            }
        );
    }

    addPosting(listing: Listing): void {
        let listingItem = new Item;
        //fix types that are stored with different names
        if (listing.listing_type == "sale") listing.listing_type = "selling";
        if (listing.listing_type == "trade") listing.listing_type = "trading";
        //1. get the linked item if it exists
        if (listing.item_id) {
            this.itemSub = this.itemService.getItemById(listing.item_id).subscribe(
                (item) => {
                    listingItem = item;
                },
                (error) => {
                    this.warning = error.error;
                }
            );
        }
        //2. convert the listing into ListingDisplayInfo (passing the listing and item) and push it to the array
        this.promotedPostings.push(new ListingDisplayInfo(listing, listingItem));
    }

    //unsubscribe upon being destroyed
    ngOnDestroy() {
        if (this.listingSub) this.listingSub.unsubscribe();
        if (this.itemSub) this.itemSub.unsubscribe();
    }
}
