import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Output, EventEmitter } from '@angular/core';

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

  action: string;
  local_data: any;
  // @Output() newFieldEvent = new EventEmitter<string>();

  constructor(private matDialogRef: MatDialogRef<CustomFieldDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: CustomFieldData) { 
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  ngOnInit(): void {
  }

  // onSaveClick(value: string) {
  //   // this.newFieldEvent.emit(value);
  //   this.matDialogRef.close("save");
  // }

  doAction(){
    this.matDialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.matDialogRef.close({event:'Cancel'});
  }
}
