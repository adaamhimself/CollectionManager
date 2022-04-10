import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Template } from '../Template';
import { TemplateService } from '../template.service';
import { Book } from '../Book';
import { Comic } from '../Comic';


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
  warning: any;
  char: any;
  chars: [];

  // subscriptions
  bookSub: any;
  articleSub: any;

  // classes
  book: Book;
  comic: Comic;

  ngOnInit(): void {
    this.book = new Book;
  }

  close(): void {
    this.dialog.close();
  }

  addChar(): void {

    
  }

  submitBookTemplate(): void {
    this.book.template_type = "book";
    this.bookSub = this.templateService.addBookTemplate(this.itemId, this.book).subscribe(
      response => {

      }, error => {
          this.warning = error.error;
      }
    );
    this.dialog.close();
  }

  submitComicTemplate(): void {
    this.comic.template_type = "comic";
    this.articleSub = this.templateService.addComicTemplate(this.itemId, this.comic).subscribe(
      response => {

      }, error => {
          this.warning = error.error;
      }
    );
    this.dialog.close();
  }

}
