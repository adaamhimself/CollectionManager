import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollectionService } from '../collection.service';
import { Collection } from '../Collection';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';


@Component({
    selector: 'app-manage-collections',
    templateUrl: './manage-collections.component.html',
    styleUrls: ['./manage-collections.component.css'],
})
export class ManageCollectionsComponent implements OnInit {
    public allCollections: Array<Collection> = [];//all of the user's collections
    public collections: Array<Collection> = [];//only ones shown (affected by search)
    public gridColumns = 3;
    public warning: string;
    public query = "";//synced with the search bar
    public collectionCount = 0;//to display

    private collectionSub: any;
    private deleteCollectionSub: any;

    constructor(private collection: CollectionService, public dialog: MatDialog) { }

    ngOnInit(): void {
        //retrieve the collections of the logged in user
        this.collectionSub = this.collection.getMyCollections().subscribe(
            (response) => {
                this.allCollections = response;//all
                this.collections = response;//currently shown
                this.collectionCount = this.collections.length;
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

    //update the shown collections using the search query
    search(): void {
        if (this.query == ""){
            //show all collections when there's no query
            this.collections = this.allCollections;
            return;
        }
        //clear the currently shown collections
        this.collections = [];
        //get all collections that fit the query
        for (let collection of this.allCollections){
            //add if the name includes the query (not case sensitive)
            if (collection.collection_name.toLowerCase().includes(this.query.toLowerCase())){
                this.collections.push(collection);
            }
        }
        //update the count
        this.collectionCount = this.collections.length;
    }

    //unsubscribe upon being destroyed
    ngOnDestroy() {
        if (this.collectionSub) this.collectionSub.unsubscribe();
        if (this.deleteCollectionSub) this.deleteCollectionSub.unsubscribe();
    }
}
