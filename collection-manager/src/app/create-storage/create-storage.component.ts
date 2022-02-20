import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { StorageData } from '../StorageData';

@Component({
  selector: 'app-create-storage',
  templateUrl: './create-storage.component.html',
  styleUrls: ['./create-storage.component.css'],
})
export class CreateStorageComponent implements OnInit {
  public createStorage: StorageData = {
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

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    // // register services that comunicate with the database will be called here
  }

  ngOnDestroy(): void {
    this.storageSub.unsubscribe();
  }
}
