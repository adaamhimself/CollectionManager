import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface CustomFieldData {
  key: string;
  value: string;
}

@Component({
  selector: 'app-custom-field-dialog',
  templateUrl: './custom-field-dialog.component.html',
  styleUrls: ['./custom-field-dialog.component.css']
})
export class CustomFieldDialogComponent implements OnInit {

  key : String;
  value: String;

  constructor(private matDialogRef: MatDialogRef<CustomFieldDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: CustomFieldData) { 
    // breaks the form
    // this.key = data.key;
    // this.value = data.value;
  }

  ngOnInit(): void {
  }

  onSaveClick() {
    this.matDialogRef.close("save");
  }
}
