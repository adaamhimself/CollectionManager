import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../item.service';
import { NewItem } from '../newItem';

@Component({
    selector: 'app-add-item',
     templateUrl: './add-item.component.html',
     styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
    public warning: string;
    private itemSub: any = null;
    public itemModel: NewItem = new NewItem;//synced form model
    public collectionName:string;

    constructor(private routing: Router, private itemService: ItemService, private route: ActivatedRoute) {
    }

    ngOnInit(): void { 
        this.collectionName = "Collection Name";
    }

    onSubmit(): void {
        //fill out the rest of the NewItem attributes

        //this.itemModel.item_image.item_image_alt_text = `Image for ${this.itemModel.item_title}`;

        //send to createItem
        let id: String = this.route.snapshot.params['id'];//parent collection id
        console.log("Sending:", this.itemModel);
        this.itemModel.containing_collection_id = id;
        this.itemSub = this.itemService.addItem(this.itemModel).subscribe(
            response => {
                console.log(response);
            }, error => {
                this.warning = error.error;
            }
        );
        this.routing.navigate(['/managecollections']);
    }

    onClose(): void {
        this.routing.navigate(['/managecollections']);
    }

    //unsubscribes upon being destroyed
    ngOnDestroy() {
        if (this.itemSub) this.itemSub.unsubscribe();
    }
}
