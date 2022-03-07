import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Collection } from '../Collection';
import { CollectionService } from '../collection.service';
import { Item } from '../Item';
import { ItemService } from '../item.service';
import { ListingService } from '../listing.service';
import { NewListing } from '../newListing';

@Component({
  selector: 'app-create-trade',
  templateUrl: './create-trade.component.html',
  styleUrls: ['./create-trade.component.css'],
})
export class CreateTradeComponent implements OnInit {
  public tradeModel: NewListing = {
    item_id: '',
    listing_name: '',
    listing_user_id: '',
    listing_price: '',
    listing_description: '',
    listing_type: 'trade',
    listing_category: '',
    listing_location: '',
    listing_condition: '',
    listing_wanted: '',
    listing_date: new Date(),
  };

  collections: Array<Collection> = [];
  public warning: string;
  private itemSub: any;
  private collectionSub: any;
  public items: Array<Item> = [];
  private newSub: any;

  selectedCollection: Collection;
  selectedItem: Item;

  constructor(
    private item: ItemService,
    private collection: CollectionService,
    private route: ActivatedRoute,
    private listingService: ListingService,
    private routing: Router
  ) {}

  // get a list of collections the user has and store in collections variable to be used in
  // the dropdown box on the page
  // (working)
  ngOnInit(): void {
    let id: String = this.route.snapshot.params['id'];
    this.collectionSub = this.collection.getCollectionByUserId().subscribe(
      (response) => {
        this.collections = response;
      },
      (error) => {
        this.warning = error.error;
      }
    );
  }

  // create a new listing with the listing data
  // (not working gives POST error in console but the tradeModel grabs data properly)
  onSubmit(): void {
    this.newSub = this.listingService.createListing(this.tradeModel).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        this.warning = error.error;
      }
    );
    console.log(this.tradeModel);
    this.routing.navigate(['/managecollections']);
  }

  // when a collection is chosen from the dropdown box, call this method and populate the item
  // dropdown select box based on the collection chosen previously thats stored in collections.
  // (not working the - items variable isnt able to grab items from the collection stored in the
  // collections variable, not sure if im using the right method)
  selected(): void {
    let id: String = this.route.snapshot.params['id'];
    this.itemSub = this.item
      .getAllItemsByCollectionId(this.selectedCollection._id)
      .subscribe(
        (response) => {
          this.items = response;
        },
        (error) => {
          this.warning = error.error;
        }
      );
    console.log(this.selectedCollection);
    console.log(this.items[0]);
  }

  itemPicked(): void {
    this.tradeModel.item_id = this.selectedItem._id;
  }
}
