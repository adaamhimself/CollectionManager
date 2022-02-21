import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-field-dialog',
  templateUrl: './custom-field-dialog.component.html',
  styleUrls: ['./custom-field-dialog.component.css']
})
export class CustomFieldDialogComponent implements OnInit {

  // @Output() newFieldEvent = new EventEmitter<string>();

  constructor(private matDialogRef: MatDialogRef<CustomFieldDialogComponent>) { }

  ngOnInit(): void {
  }

  onSaveClick(value: string) {
    // this.newFieldEvent.emit(value);
    this.matDialogRef.close("save");
  }
}
