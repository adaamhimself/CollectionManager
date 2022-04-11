import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Collection } from '../Collection';
import { CollectionService } from '../collection.service';
import { Item } from '../Item';
import { ItemService } from '../item.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CustomFieldDialogComponent } from '../custom-field-dialog/custom-field-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { TemplateService } from '../template.service';
import { Template } from '../Template';
import { CustomField } from '../CustomField';
import { AddTemplateDialogComponent } from '../add-template-dialog/add-template-dialog.component';

export interface DialogData{
    key: String;
    value: String;
}

@Component({
    selector: 'app-view-item',
    templateUrl: './view-item.component.html',
    styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {
    public item: Item = new Item;
    public collectionDetails: Collection = new Collection;
    public warning: string;
    private itemSub: any;
    private collectionSub: any;
    private addFieldSub: any;
    private deleteSub: any;
    private templateSub: any;
    public template = new Template;
    public customField: CustomField = new CustomField;
    key: String;
    value: String;
    images: any = [];

    constructor(private routing: Router, private route: ActivatedRoute, private itemService: ItemService, private collection: CollectionService, public dialog: MatDialog, private templateService: TemplateService) {
     }

    ngOnInit(): void {
        let id: String = this.route.snapshot.params['id'];
        this.itemSub = this.itemService.getItemById(id).subscribe(
            (response) => {
                this.item = response;
                for (let i:any = 0; i < response.item_images.length; i++) {
                    this.images.push(response.item_images[i]);
                }
                console.log(this.item);
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
        if (this.item.template_object_id) {
            this.templateSub = this.templateService.getTemplateById(id).subscribe(
                (response) => {
                    console.log(response);
                    this.template = response;
                    this.template.template_type = this.template.template_type[0].toUpperCase() + this.template.template_type.substring(1).toLowerCase();
                },
                (error) => {
                    this.warning = error.error;
                    console.log(error);
                }
            );
        }
    }

    onEdit(): void {
        this.routing.navigate([`/edititem/${this.item._id}`]);
    }

    //handles item deletion
    deleteItem(): void {
        //open a dialog box, passing what's being deleted so it displays correctly
        const dialogRef = this.dialog.open(DeleteDialogComponent,{
            data: {
                deletingObject: "Item"
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            //delete the item if they chose yes
            if (result === "yes") {
                this.deleteSub = this.itemService.removeItem(this.item._id).subscribe(
                    (response) => {
                        this.routing.navigate(['/managecollections']);
                    },
                    (error) => {
                        this.warning = error.error;
                    }
                );
            }
        });
    }

    //handles the addition of custom fields
    addCustomField(id: String): void {
        const dialogRef = this.dialog.open(CustomFieldDialogComponent, {
            width: '250px',
            data: {key: this.key, value: this.value}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result != "close") {
                this.customField = result;
                this.addFieldSub = this.itemService.addCustomField(id, this.customField).subscribe(
                (response) => {
                    console.log(response);
                    window.location.reload();
                },
                (error) => {
                    this.warning = error.error;
                }
            );
            }
        });
    }

    //unsubscribes upon being destroyed
    ngOnDestroy() {
        if (this.itemSub) this.itemSub.unsubscribe();
        if (this.collectionSub) this.collectionSub.unsubscribe();
        if (this.addFieldSub) this.addFieldSub.unsubscribe();
        if (this.deleteSub) this.deleteSub.unsubscribe();
        if (this.templateSub) this.templateSub.unsubscribe();
        if (this.addFieldSub) this.addFieldSub.unsubscribe();
    }

    addTemplate() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            itemId: this.item._id
        };
        dialogConfig.width = '25%';
        this.dialog.open(AddTemplateDialogComponent, dialogConfig);
    }
}
