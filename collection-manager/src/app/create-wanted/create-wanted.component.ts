import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Collection } from '../Collection';
import { Item } from '../Item';
import { ListingService } from '../listing.service';
import { NewListing } from '../newListing';

@Component({
  selector: 'app-create-wanted',
  templateUrl: './create-wanted.component.html',
  styleUrls: ['./create-wanted.component.css'],
})
export class CreateWantedComponent implements OnInit {
  public tradeModel: NewListing = {
    item_id: '',
    item_wanted_name: '',
    listing_name: '',
    listing_user_id: '',
    listing_price: '',
    listing_description: '',
    listing_type: 'wanted',
    listing_category: '',
    listing_location: '',
    listing_condition: '',
    listing_wanted: '',
    listing_date: new Date(),
  };

  collections: Array<Collection> = [];
  public warning: string;
  public items: Array<Item> = [];
  private newSub: any;

  constructor(
    private listingService: ListingService,
    private routing: Router
  ) {}

  ngOnInit(): void {}

  // create a new listing with the listing data
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
    this.routing.navigate(['/mylistings']);
  }
}
