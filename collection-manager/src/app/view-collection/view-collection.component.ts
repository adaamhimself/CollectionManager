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
    public allItems: Array<Item> = [];//all of the collection's items
    public items: Array<Item> = [];//only ones shown (affected by search)
    public collectionDetails: Collection = new Collection;//for some info
    public gridColumns = 3;
    public warning: string;
    public query = "";//synced with the search bar
    public itemCount = 0;//to display

    private itemSub: any;
    private collectionSub: any;

    constructor(private item: ItemService, private collection: CollectionService, private route: ActivatedRoute) { }


    ngOnInit(): any {
        let id: String = this.route.snapshot.params['id'];
        //retrieve all the items in the collection
        this.itemSub = this.item.getAllItemsByCollectionId(id).subscribe(
            (response) => {
                this.allItems = response;//all
                this.items = response;//currently shown
                this.itemCount = this.items.length;
            },
            (error) => {
                this.warning = error.error;
            }
        )
        //retrieve the collection details
        this.collectionSub = this.collection.getCollectionById(id).subscribe(
            (response) => {
                this.collectionDetails = response;
            },
            (error) => {
                this.warning = error.error;
            }
        );
    }

    //update the shown items using the search query
    search(): void {
        if (this.query == "") {
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
    }

    //unsubscribe upon being destroyed
    ngOnDestroy() {
        if (this.itemSub) this.itemSub.unsubscribe();
        if (this.collectionSub) this.collectionSub.unsubscribe();
    }
}
