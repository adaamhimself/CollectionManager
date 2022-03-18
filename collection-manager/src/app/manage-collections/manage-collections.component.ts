import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CollectionService } from '../collection.service';
import { Collection } from '../Collection';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';


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
  private deleteCollectionSub: any;

  constructor(private collection: CollectionService, public dialog: MatDialog) {}

  ngOnInit(): void {
    //retrieve the collections of the logged in user
    this.collectionSub = this.collection.getMyCollections().subscribe(
      (response) => {
        this.collections = response;
      },
      (error) => {
        this.warning = error.error;
      }
    );
  }

  onDeleteClick(): void {
    //delete the collection
    this.collectionSub.unsubscribe();
  }

  deleteCollection(id: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === "yes") {
        this.deleteCollectionSub = this.collection.removeCollection(id).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        this.warning = error.error;
      }
    );
    }
    });
  }

  //unsubscribe upon being destroyed
  ngOnDestroy() {
    if (this.collectionSub) this.collectionSub.unsubscribe();
    if (this.deleteCollectionSub) this.deleteCollectionSub.unsubscribe();
  }
}
