import { Component, OnInit } from '@angular/core';
import { Item } from '../Item';
import { ItemService } from '../item.service';
import { Listing } from '../listing';
import { ListingService } from '../listing.service';

//This class contains the attributes that the HTML requires to show needed information.
//It contains attributes from both the listing and the item that is linked to it (item_id).
//The item must be retrieved ahead of time to be passed in the constructor with the listing.
class PostingCardInfo {
    listing_id: String;
    item_id: String;
    user_id: String;
    name: String;
    description: String;
    wanted: String;
    condition: String;
    price: String;
    post_date: Date;
    category: String;
    location: String;
    image_path: String = "";
    image_alt: String = "";

    constructor(listing: Listing, item: Item) {
        //fields from the listing
        this.listing_id = listing._id;
        this.user_id = listing.listing_user_id;
        this.description = listing.listing_description;
        this.wanted = listing.listing_wanted;
        this.price = listing.listing_price;
        this.category = listing.listing_category;
        this.location = listing.listing_location;
        this.post_date = listing.listing_date;
        //fields from the item
        this.item_id = item._id;
        //name
        if (listing.listing_name && listing.listing_name != ""){
            this.name = listing.listing_name;
        } else if (item.item_title && item.item_title != ""){
            this.name = item.item_title;
        } else {
            this.name = "No Name";
        }
        //condition
        if (item.condition && item.condition != ""){
            this.condition = item.condition;
        } else {
            this.condition = "N/A";
        }
        //image
        if (Object.keys(item.item_images).length != 0) {
            this.image_path = item.item_images[0].item_image_path;
            this.image_alt = item.item_images[0].item_image_text;
        } else {
            this.image_path = "../../assets/images/bluelogo.png";
            this.image_alt = "logo";
        }
    }
}

@Component({
    selector: 'app-market',
    templateUrl: './market.component.html',
    styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
    public postings: Array<PostingCardInfo> = [];//currently shown postings
    public postType: String = "selling";//currently displayed type: selling, wanted, or trading
    public gridColumns = 3;
    public warning: string;
    public query: String = "watch";//search bar text
    private listingSub: any = null;
    private itemSub: any = null;
    constructor(private listingService: ListingService, private itemService: ItemService) { }

    ngOnInit(): void {
        this.showSellingPostings();//default
    }

    //changes the posting type that is shown
    //called by showSellingPostings, showWantedPostings, and showTradingPostings
    showPostings(listings: any, type: String): void {
        this.postings = [];//clear the displayed postings
        this.postType = type;//type of posting being displayed
        //add class "type-selected" to selected posting type only (they all must also have class post-type)
        document.getElementById("type-selling").className = `post-type ${(type == "selling") ? " type-selected" : ""}`;
        document.getElementById("type-wanted").className = `post-type ${(type == "wanted") ? " type-selected" : ""}`;
        document.getElementById("type-trading").className = `post-type ${(type == "trading") ? " type-selected" : ""}`;
        //if nothing was retrieved from the service
        if (!(listings && listings.length > 0)) {
            console.log("Nothing returned from listing service. Likely nothing there but may be an error.");
            return;
        }
        //for each market posting
        listings.forEach(listing => {
            //1. get the item instance it's linked to (using the field item_id)
            this.itemSub = this.itemService.getItemById(listing.item_id).subscribe(
                (item) => {
                    //2. convert the listing into PostingCardInfo (passing the listing and item) and push it to the array
                    let temp = new PostingCardInfo(listing, item);
                    this.postings.push(new PostingCardInfo(listing, item));
                },
                (error) => {
                    this.warning = error.error;
                }
            );
        });
        console.log(this.postings);
    }

    //called when the user clicks "Selling" (span element with id type-selling)
    showSellingPostings(): void {
        //retrieve all selling postings
        this.listingSub = this.listingService.getAllSellingListings().subscribe(
            (response) => {
                this.showPostings(response, "selling");
            },
            (error) => {
                this.warning = error.error;
            }
        );
    }

    //called when the user clicks "Wanted" (span element with id type-wanted)
    showWantedPostings(): void {
        //retrieve all wanted postings
        this.listingSub = this.listingService.getAllWantedListings().subscribe(
            (response) => {
                this.showPostings(response, "wanted");
            },
            (error) => {
                this.warning = error.error;
            }
        );
    }

    //called when the user clicks "Trading" (span element with id type-trading)
    showTradingPostings(): void {
        //retrieve all trading postings
        this.listingSub = this.listingService.getAllTradingListings().subscribe(
            (response) => {
                this.showPostings(response, "trading");
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
    }
}
