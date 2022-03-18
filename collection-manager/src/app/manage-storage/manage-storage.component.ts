import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CollectionService } from '../collection.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Storage } from '../Storage' 
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-manage-storage',
  templateUrl: './manage-storage.component.html',
  styleUrls: ['./manage-storage.component.css'],
})
export class ManageStorageComponent implements OnInit {
  gridColumns = 3;
  storageList: Array<Storage> = [];

  private storageSub: any;
  private deleteStorageSub: any;

  constructor(
    public dialog: MatDialog,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.storageSub = this.storage.getStorageByUserId()
    .subscribe(
      (response) => {
        this.storageList = response;
      },
      (error) => {

      }
    )

  }

  onDeleteClick(): void {
    //delete the collection

  }

  deleteCollection(id: String): void {
    // needs data services completed for storages
    //const dialogRef = this.dialog.open(DeleteDialogComponent);
    //dialogRef.afterClosed().subscribe(result => {
  }

  ngOnDestroy(): void {
    this.storageSub.unsubscribe();
  }
}
