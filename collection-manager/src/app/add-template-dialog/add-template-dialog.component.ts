import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Template } from '../Template';

@Component({
  selector: 'app-add-template-dialog',
  templateUrl: './add-template-dialog.component.html',
  styleUrls: ['./add-template-dialog.component.css']
})
export class AddTemplateDialogComponent implements OnInit {

  constructor(private dialog: MatDialogRef<AddTemplateDialogComponent>, @Inject(MAT_DIALOG_DATA) data) { 
    this.itemId = data.itemId
  }

  itemId: any;
  adding: any;
  selected: any;

  ngOnInit(): void {
  }

  close(): void {
    this.dialog.close();
  }

  add(): void {
    this.adding = true;
    
  }

}
