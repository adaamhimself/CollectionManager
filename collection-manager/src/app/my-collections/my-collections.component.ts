import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { Collection } from '../Collection';

@Component({
  selector: 'app-my-collections',
  templateUrl: './my-collections.component.html',
  styleUrls: ['./my-collections.component.css'],
})
export class MyCollectionsComponent implements OnInit {
  gridColumns = 3;
  collections: Array<Collection> = [];

  public warning: string;

  private collectionSub: any;

  constructor(private collection: CollectionService) {}

  ngOnInit(): void {
    this.collectionSub = this.collection.getCollectionByUserId().subscribe(
      response => {
        this.collections = response;
        console.log(response);
      }, error => {
        this.warning = error.error;
      }
    )

  }

  onDeleteClick(): void {
    //delete the collection
    this.collectionSub.unsubscribe();
  }
}
