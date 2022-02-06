import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.css'],
})
export class EditCollectionComponent implements OnInit {
  collection: any;
  public warning: string;
  public loading: boolean = false;
  constructor(private routing: Router) {}

  ngOnInit(): void {}

  onCloseCollection(): void {
    this.routing.navigate(['/managecollections']);
  }

  updateCollection(): void {
    this.routing.navigate(['/managecollections']);
  }
}
