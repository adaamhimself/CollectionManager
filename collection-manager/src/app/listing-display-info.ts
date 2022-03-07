import { Item } from "./Item";
import { Listing } from "./listing";

//This class contains the attributes that the HTML for some pages require to show needed information.
//It contains attributes from both the listing and the item that is linked to it (item_id).
//The item must be retrieved ahead of time to be passed in the constructor with the listing.

export class ListingDisplayInfo {
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
        //ID fields
        this.listing_id = listing._id;
        this.user_id = listing.listing_user_id;
        this.item_id = item._id;
        //misc fields
        this.wanted = listing.listing_wanted;
        this.price = listing.listing_price;
        this.post_date = listing.listing_date;
        //name
        if (listing.listing_name && listing.listing_name != ""){
            this.name = listing.listing_name;
        } else if (item.item_title && item.item_title != ""){
            this.name = item.item_title;
        } else {
            this.name = "No Name";
        }
        //description
        if (listing.listing_description && listing.listing_description != ""){
            this.description = listing.listing_description;
        } else {
            this.description = "N/A";
        }
        //category
        if (listing.listing_category && listing.listing_category != ""){
            this.category = listing.listing_category;
        } else {
            this.category = "N/A";
        }
        //condition
        if (item.condition && item.condition != ""){
            this.condition = item.condition;
        } else {
            this.condition = "N/A";
        }
        //location
        if (listing.listing_location && listing.listing_location != ""){
            this.location = listing.listing_location;
        } else {
            this.location = "N/A";
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