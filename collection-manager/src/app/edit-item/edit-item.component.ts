import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from '../Item';
import { ItemService } from '../item.service';

@Component({
    selector: 'app-edit-item',
    templateUrl: './edit-item.component.html',
    styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
    public warning: string;
    private editSub: any;
    public itemModel: Item = null;//synced form model
    public itemName: string = "";//displays at top of page

    constructor(private routing: Router, private route: ActivatedRoute, private itemService: ItemService) { }

    ngOnInit(): void {
        let id: String = this.route.snapshot.params['id'];
        this.editSub = this.itemService.getItemById(id).subscribe(
            (response) => {
                this.itemModel = response;
                if (this.itemModel) this.itemName = `${this.itemModel.item_title}`;
                console.log("item:", this.itemModel);
            }, (error) => {
                this.warning = error.error;
            }
        )
    }

    onSubmit(): void {
        //send to editItem
        console.log("Sending:", this.itemModel);
        this.editSub = this.itemService.editItem(this.itemModel).subscribe(
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
        if (this.editSub) this.editSub.unsubscribe();
    }
}
