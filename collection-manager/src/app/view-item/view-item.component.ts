import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from '../Item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {

  item: Item;

  public warning: string;

  private itemSub: any;
  
  constructor(private routing: Router, private route: ActivatedRoute, private itemService: ItemService) { }

  ngOnInit(): void {
    let id: String = this.route.snapshot.params['id'];
    this.itemSub = this.itemService.getItemById(id).subscribe(
      (response) => {
        this.item = response;
        console.log(response);
      },
      (error) => {
        this.warning = error.error;
      }
    );
  }

  onSubmit(): void {
      this.routing.navigate(['/editItem']);
  }

  onDelete(): void {
      this.routing.navigate(['/deleteItem']);
  }

  // manageImages(): void {

  // }
}
