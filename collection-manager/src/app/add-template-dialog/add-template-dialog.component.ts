import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Template } from '../Template';
import { TemplateService } from '../template.service';
import { Book } from '../Book';

@Component({
  selector: 'app-add-template-dialog',
  templateUrl: './add-template-dialog.component.html',
  styleUrls: ['./add-template-dialog.component.css']
})
export class AddTemplateDialogComponent implements OnInit {

  constructor(private templateService: TemplateService, private dialog: MatDialogRef<AddTemplateDialogComponent>, @Inject(MAT_DIALOG_DATA) data) { 
    this.itemId = data.itemId
  }

  itemId: any;
  adding: any;
  selected: any;
  book: Book;
  bookSub: any;
  warning: any;

  ngOnInit(): void {
    this.book = new Book;
  }

  close(): void {
    this.dialog.close();
  }

  add(): void {
    this.adding = true;
    
  }

  submitBookTemplate(): void {
    this.book.template_type = "book";
    this.bookSub = this.templateService.addBookTemplate(this.itemId, this.book).subscribe(
      response => {
          console.log(response);
      }, error => {
          this.warning = error.error;
      }
    );
    this.dialog.close();
  }

}
