import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { Collection } from '../Collection';

@Component({
  selector: 'app-manage-collections',
  templateUrl: './manage-collections.component.html',
  styleUrls: ['./manage-collections.component.css'],
})
export class ManageCollectionsComponent implements OnInit {
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
