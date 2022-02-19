import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Collection } from '../Collection';
import { Item } from '../Item';
import { ItemService } from '../item.service';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-view-collection',
  templateUrl: './view-collection.component.html',
  styleUrls: ['./view-collection.component.css']
})
export class ViewCollectionComponent implements OnInit {

  private itemSub: any;
  private collectionSub: any;
  public warning: string;
  public items: Array<Item>;
  public collectionDetails: Collection;
  gridColumns = 3;

  constructor(private item: ItemService, private collection: CollectionService, private route: ActivatedRoute) { }
  

  ngOnInit(): any {
    let id: String = this.route.snapshot.params['id'];
    this.itemSub = this.item.getAllItemsByCollectionId(id).subscribe(
      (response) => {
        this.items = response;
      },
      (error) => {
        this.warning = error.error;
      }
    )
    this.collectionSub = this.collection.getCollectionById(id).subscribe(
      (response) => {
        this.collectionDetails = response;
      },
      (error) => {
        this.warning = error.error;
      }
    )
  }

}
