import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Collection } from '../Collection';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css'],
})
export class CreateCollectionComponent implements OnInit {
  public collectionModel: Collection = {
    _id: '',
    collection_name: '',
    collection_description: '',
    collection_user_id: '',
    collection_image: {
      collection_image_path: '',
      collection_image_alt_text: '',
    },
  };

  public warning: string;
  public loading: boolean = false;
  private collectionSub: any;
  private newSub: any;

  constructor(
    private routing: Router,
    private route: ActivatedRoute,
    private colService: CollectionService
  ) {}

  ngOnInit(): void {
    let id: String = this.route.snapshot.params['id'];
  }

  onSubmit(): void {
    this.newSub = this.colService
      .createCollection(this.collectionModel)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          this.warning = error.error;
        }
      );
    this.routing.navigate(['/managecollections']);
  }

  /*
  onSubmit(): void {
    //console.log("Changing collection to:", this.collectionModel);
    this.newSub = this.colService
      .editCollection(this.collectionModel)
      .subscribe(
        (response) => {
          //console.log(response);
        },
        (error) => {
          this.warning = error.error;
        }
      );
    this.routing.navigate(['/managecollections']);
  }
  */
}
