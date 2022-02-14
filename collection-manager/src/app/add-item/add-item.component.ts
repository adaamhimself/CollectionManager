import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { NewItem } from '../newItem';

@Component({
    selector: 'app-add-item',
     templateUrl: './add-item.component.html',
     styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
    public warning: string;
    private editSub: any;
    public itemModel: NewItem = null;//synced form model
    public collectionName:string;

    constructor(private routing: Router, private itemService: ItemService) {
        this.itemModel = new NewItem;
    }

    ngOnInit(): void { 
        this.collectionName = "Collection Name";
        //fill out default values for a new item
        this.itemModel.item_name = "";
        this.itemModel.item_description = "";
        this.itemModel.item_user_id = "Get the user ID";
        this.itemModel.item_image = {
            item_image_path: "../../assets/images/bluelogo.png",
            item_image_alt_text: "Item image"
        };
        this.itemModel.item_title = "N/A";
        this.itemModel.item_template = "";
        this.itemModel.item_templateNote = "";
        this.itemModel.item_storageType = "";
        this.itemModel.item_storageCode = "";
        this.itemModel.item_storageLocation = "";
        this.itemModel.item_storageNote = "";
    }

    onSubmit(): void {
        //fill out the rest of the NewItem attributes
        this.itemModel.item_image.item_image_alt_text = `Image for ${this.itemModel.item_name}`;
        //send to createItem
        console.log("Sending:", this.itemModel);
        this.editSub = this.itemService.createItem(this.itemModel).subscribe(
            response => {
                //console.log(response);
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
        if (this.editSub) this.editSub.unsubscribe();
    }
}
