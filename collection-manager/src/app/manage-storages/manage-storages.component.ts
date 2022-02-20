import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CollectionService } from '../collection.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { StorageData } from '../StorageData';

@Component({
  selector: 'app-manage-storages',
  templateUrl: './manage-storages.component.html',
  styleUrls: ['./manage-storages.component.css'],
})
export class ManageStoragesComponent implements OnInit {
  gridColumns = 4;
  storages: Array<StorageData> = [];

  private storageSub: any;
  private deleteStorageSub: any;

  constructor(
    private collection: CollectionService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onDeleteClick(): void {
    //delete the collection
    this.storageSub.unsubscribe();
  }

  deleteCollection(id: String): void {
    // needs data services completed for storages
    //const dialogRef = this.dialog.open(DeleteDialogComponent);
    //dialogRef.afterClosed().subscribe(result => {
  }
}
