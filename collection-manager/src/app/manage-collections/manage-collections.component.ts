import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-collections',
  templateUrl: './manage-collections.component.html',
  styleUrls: ['./manage-collections.component.css'],
})
export class ManageCollectionsComponent implements OnInit {
  gridColumns = 3;
  collections: Array<any> = [];

  constructor() {}

  ngOnInit(): void {}

  onDeleteClick(): void {
    //delete the collection
  }
}
