import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Storage } from '../Storage';

@Component({
  selector: 'app-create-storage',
  templateUrl: './create-storage.component.html',
  styleUrls: ['./create-storage.component.css'],
})
export class CreateStorageComponent implements OnInit {
  public newStorage: Storage = {
    _id: '',
    storage_name: '',
    storage_type: '',
    storage_location: '',
  };

  public warning: string;
  public loading: boolean = false;
  public success: boolean = false;
  public response: string;
  private storageSub: any;

  constructor(private storage: StorageService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    // // register services that comunicate with the database will be called here
    this.storageSub = this.storage.createStorage(this.newStorage)
    .subscribe(
      (response) => {
        console.log(response);
        this.success = true;
      },
      (error) => {
        this.warning = error.error;
      }
    )
  }

  ngOnDestroy(): void {
    this.storageSub.unsubscribe();
  }
}
