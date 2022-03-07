import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../Item';
import { ItemService } from '../item.service';
import { Listing } from '../listing';
import { ListingService } from '../listing.service';

//This class contains the attributes that the HTML requires to show needed information.
//It contains attributes from both the listing and the item that is linked to it (item_id).
//The item must be retrieved ahead of time to be passed in the constructor with the listing.
class PostingViewInfo {
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
    image_path: String;
    image_alt: String;

    constructor(listing: Listing, item: Item) {
        //fields from the listing
        this.listing_id = listing._id;
        this.user_id = listing.listing_user_id;
        this.name = listing.listing_name;
        this.description = listing.listing_description;
        this.wanted = listing.listing_wanted;
        this.price = listing.listing_price;
        this.category = listing.listing_category;
        this.location = listing.listing_location;
        this.post_date = listing.listing_date;
        //fields from the item
        this.item_id = item._id;
        this.condition = item.condition;
        this.image_path = item.item_images[0].item_image_path;
        this.image_alt = item.item_images[0].item_image_text;
        if (this.image_path == ""){
            this.image_path = "../../assets/images/bluelogo.png";
            this.image_alt = "logo";
        }
    }
}

@Component({
    selector: 'app-view-posting',
    templateUrl: './view-posting.component.html',
    styleUrls: ['./view-posting.component.css']
})
export class ViewPostingComponent implements OnInit {
    public posting: PostingViewInfo = null;
    public postType: String = "";
    public warning: string;
    private listingSub: any = null;
    private itemSub: any = null;

    constructor(private route: ActivatedRoute, private listingService: ListingService, private itemService: ItemService) { }

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
                //convert the listing into PostingViewInfo (passing the listing and item) and set the shown posting
                this.posting = new PostingViewInfo(listing, item);
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