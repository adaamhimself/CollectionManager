import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';

//component imports
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManageCollectionsComponent } from './manage-collections/manage-collections.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { ViewItemComponent } from './view-item/view-item.component';
import { AddItemComponent } from './add-item/add-item.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'editcollection/:id',
    component: EditCollectionComponent,
  },
  {
    path: 'managecollections',
    component: ManageCollectionsComponent,
  },
  {
    path: 'createcollection',
    component: CreateCollectionComponent,
  },
  {
    path: 'additem',
    component: AddItemComponent,
  },
  {
    path: 'viewitem/:id',
    component: ViewItemComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
