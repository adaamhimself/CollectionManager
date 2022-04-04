import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Collection } from '../Collection';
import { CollectionService } from '../collection.service';
import { Item } from '../Item';
import { ItemService } from '../item.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomFieldDialogComponent } from '../custom-field-dialog/custom-field-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { TemplateService } from '../template.service';
import { Template } from '../Template';
import { CustomField } from '../CustomField';

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
    public template: Template = new Template;
    public customField: CustomField = new CustomField;

    constructor(private routing: Router, private route: ActivatedRoute, private itemService: ItemService, private collection: CollectionService, public dialog: MatDialog, private templateService: TemplateService) { }

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
        this.templateSub = this.templateService.getTemplateById(id).subscribe(
            (response) => {
                this.template = response;
                this.template.template_type = this.template.template_type[0].toUpperCase() + this.template.template_type.substring(1).toLowerCase();
            },
            (error) => {
                this.warning = error.error;
                console.log(error);
            }
        );

        this.addFieldSub = this.itemService.getCustomFields(id).subscribe(
            (response) => {
                this.customField = response;
            },
            (error) => {
                this.warning = error.error;
                console.log(error);
            }
        )
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

    // addCustomField(id: String): void {
    //     const dialogRef = this.dialog.open(CustomFieldDialogComponent);
    //     dialogRef.afterClosed().subscribe(result => {
    //         if (result === "save") {
    //             // confused here
    //             this.addFieldSub = this.itemService.addCustomField(id, this.customField).subscribe(
    //                 (response) => {
    //                     console.log(response);
    //                     window.location.reload();
    //                 },
    //                 (error) => {
    //                     this.warning = error.error;
    //                 }
    //             );
    //         }

    //         console.log("Dialog output:", result)
    //     });
    // }

    //handles the addition of custom fields
    addCustomField(id: String): void {
        const dialogRef = this.dialog.open(CustomFieldDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result === "save") {
                // confused here
                this.addFieldSub = this.itemService.addCustomField(this.customField).subscribe(
                    (response) => {
                        console.log(response);
                        window.location.reload();
                    },
                    (error) => {
                        this.warning = error.error;
                    }
                );
            }
            console.log("Dialog output:", result)
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
}
