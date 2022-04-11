import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Collection } from '../Collection';
import { CollectionService } from '../collection.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Item } from '../Item';
import { ItemService } from '../item.service';
import { StorageService } from '../storage.service';
import { Storage } from '../Storage';

@Component({
  selector: 'app-view-storage',
  templateUrl: './view-storage.component.html',
  styleUrls: ['./view-storage.component.css'],
})
export class ViewStorageComponent implements OnInit {
  public allItems: Array<Item> = []; //all of the collection's items
  public items: Array<Item> = []; //only ones shown (affected by search)
  public collectionDetails: Collection = new Collection(); //for some info
  public gridColumns = 3;
  public warning: string;
  public message = 'Looks like this storage box has no items.';
  public query = ''; //synced with the search bar
  public itemCount = 0; //to display

  public storageModel: Storage = new Storage(); // synced form model
  public storageName: string = ''; // displays at top of page
  private itemSub: any = null;
  private storageSub: any = null;
  private collectionSub: any = null;
  private deleteItemSub: any = null;
  private editSub: any = null;

  constructor(
    private itemService: ItemService,
    private storageService: StorageService,
    private collectionService: CollectionService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    let id: string = this.route.snapshot.params['id'];
    //retrieve all the items that match the storage id
    this.storageSub = this.storageService.getItemsInStorageByCode(id).subscribe(
      (response) => {
        this.allItems = response;
        this.items = response;
        this.itemCount = this.items.length;
      },
      (error) => {
        this.warning = error.error;
      }
    );
  }

  //handles item deletion
  deleteItem(itemID: String): void {
    //open a dialog box, passing what's being deleted so it displays correctly
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        deletingObject: 'Item',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      //delete the item if they chose yes
      if (result === 'yes') {
        this.deleteItemSub = this.itemService.removeItem(itemID).subscribe(
          (response) => {
            window.location.reload(); //reload the page
          },
          (error) => {
            this.warning = error.error;
          }
        );
      }
    });
  }

  //update the shown items using the search query
  search(): void {
    //default message
    this.message =
      'Looks like this collection has no items. Click "+ Item" to add your first one.';
    if (this.query == '') {
      //show all items when there's no query
      this.items = this.allItems;
      return;
    }
    //clear the currently shown items
    this.items = [];
    //get all items that fit the query
    for (let item of this.allItems) {
      //add if the name includes the query (not case sensitive)
      if (item.item_title.toLowerCase().includes(this.query.toLowerCase())) {
        this.items.push(item);
      }
    }
    //update the count
    this.itemCount = this.items.length;
    //update message if no items were found
    if (this.itemCount == 0) {
      this.message =
        'No items fit that search query. Check spelling and try a simpler query.';
    }
    console.log(this.items);
  }
}
