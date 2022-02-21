import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Collection } from '../Collection';
import { CollectionService } from '../collection.service';
import { Item } from '../Item';
import { ItemService } from '../item.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomFieldDialogComponent } from '../custom-field-dialog/custom-field-dialog.component';

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
  private addFieldSub: any;
  private deleteSub: any;
  
  constructor(private routing: Router, private route: ActivatedRoute, private itemService: ItemService, private collection: CollectionService, public dialog: MatDialog) { }

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
    this.deleteSub = this.itemService.removeItem(this.item._id).subscribe(
      (response) => {
        this.collectionDetails = response;
      },
      (error) => {
        this.warning = error.error;
      }
    );  
    this.routing.navigate(['/managecollections']);
  }

  addCustomField(id: String): void {
    const dialogRef = this.dialog.open(CustomFieldDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === "save") {
        //this.deleteCollectionSub = this.collection.removeCollection(id).subscribe
        // confused here
        this.addFieldSub = this.collection.removeCollection(id).subscribe(
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
}
