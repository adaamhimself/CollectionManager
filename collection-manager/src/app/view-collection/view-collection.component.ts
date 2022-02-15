import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../Item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-view-collection',
  templateUrl: './view-collection.component.html',
  styleUrls: ['./view-collection.component.css']
})
export class ViewCollectionComponent implements OnInit {

  private itemSub: any;
  public warning: string;
  public items: Array<Item>;
  gridColumns = 3;

  constructor(private item: ItemService, private route: ActivatedRoute) { }
  

  ngOnInit(): void {
    let id: String = this.route.snapshot.params['id'];
    this.itemSub = this.item.getAllItemsByCollectionId(id).subscribe(
      (response) => {
        this.items = response;
      },
      (error) => {
        this.warning = error.error;
      }
    )
  }

}
