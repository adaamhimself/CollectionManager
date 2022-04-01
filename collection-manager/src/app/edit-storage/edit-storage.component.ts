import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '../Storage';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-edit-storage',
  templateUrl: './edit-storage.component.html',
  styleUrls: ['./edit-storage.component.css']
})
export class EditStorageComponent implements OnInit {
  public warning: string;
  private editSub: any;
  public storageModel: Storage = new Storage;//synced form model
  public storageName: string = "";//displays at top of page

  constructor(private routing: Router, private route: ActivatedRoute, private stoService: StorageService) { }

  ngOnInit(): void {
    let id: string = this.route.snapshot.params['id'];
    this.editSub = this.stoService.getStorageById(id).subscribe(
      (response) => {
        this.storageModel = response;
        if (this.storageModel) this.storageName = `${this.storageModel.storage_name}`;
        console.log("item:", this.storageModel);
      }, (error) => {
          this.warning = error.error;
    }
    )
}

onSubmit(): void { 
  console.log("Sending:", this.storageModel);
    this.editSub = this.stoService.editStorageDetails(this.storageModel).subscribe(
        response => {
            console.log(response);
        }, error => {
            this.warning = error.error;
        }
    );
    this.routing.navigate(['/managestorage']);
}

onClose(): void {
    this.routing.navigate(['/managestorage']);
}

//unsubscribes upon being destroyed
ngOnDestroy() {
    if (this.editSub) this.editSub.unsubscribe();
  }
}