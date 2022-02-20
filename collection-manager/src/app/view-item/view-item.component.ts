import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Collection } from '../Collection';
import { CollectionService } from '../collection.service';
import { Item } from '../Item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {

  item: Item = new Item;
  collectionDetails: Collection = new Collection;
  public warning: string;
  private itemSub: any;
  private collectionSub: any;
  
  constructor(private routing: Router, private route: ActivatedRoute, private itemService: ItemService, private collection: CollectionService) { }

  ngOnInit(): void {
    let id: String = this.route.snapshot.params['id'];
    this.itemSub = this.itemService.getItemById(id).subscribe(
      (response) => {
        this.item = response;
        this.collectionSub = this.collection.getCollectionById(this.item.containing_collection_id).subscribe(
          (response) => {
            this.collectionDetails = response;
          },
          (error) => {
            this.warning = error.error;
          }
        );
      },
      (error) => {
        this.warning = error.error;
      }
    );
  }

  onSubmit(): void {
      this.routing.navigate([`/edititem/${this.item._id}`]);
  }

  onDelete(): void {
      this.routing.navigate(['/deleteItem']);
  }

  // manageImages(): void {

  // }
}
