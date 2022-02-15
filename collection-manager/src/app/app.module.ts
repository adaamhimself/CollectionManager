import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import page components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CollectionsComponent } from './collections/collections.component';
import { MarketComponent } from './market/market.component';
import { ManageCollectionsComponent } from './manage-collections/manage-collections.component';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';

//import modules
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { AddItemComponent } from './add-item/add-item.component';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { InterceptTokenService } from './intercept-token.service';
import { MatSliderModule } from '@angular/material/slider';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { ViewItemComponent } from './view-item/view-item.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ViewCollectionComponent } from './view-collection/view-collection.component';

@NgModule({
  //components (pages)
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    CollectionsComponent,
    MarketComponent,
    LoginComponent,
    RegisterComponent,
    ManageCollectionsComponent,
    EditCollectionComponent,
    CreateCollectionComponent,
    ViewItemComponent,
    AddItemComponent,
    DeleteDialogComponent,
    ViewCollectionComponent
  ],
  //included modules
  imports: [
    BrowserModule,
    MatIconModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatInputModule,
    FlexLayoutModule,
    FormsModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatListModule,
    MatFormFieldModule,
    MatChipsModule,
    NoopAnimationsModule,
    HttpClientModule,
    MatSliderModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptTokenService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
