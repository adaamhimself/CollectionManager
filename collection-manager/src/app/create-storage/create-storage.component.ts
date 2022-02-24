import { Component, OnInit } from '@angular/core';
import { Storage } from '../storage';

@Component({
  selector: 'app-create-storage',
  templateUrl: './create-storage.component.html',
  styleUrls: ['./create-storage.component.css'],
})
export class CreateStorageComponent implements OnInit {
  public createStorage: Storage = {
    storage_name: "",
    storage_type: "",
    storage_location: "",
  };

  public warning: string;
  public loading: boolean = false;
  public success: boolean = false;
  public response: string;
  private storageSub: any;

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    // // register services that comunicate with the database will be called here

  }

  ngOnDestroy(): void {
    this.storageSub.unsubscribe();
  }
}
