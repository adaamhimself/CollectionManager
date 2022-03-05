import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from './Item';
import { NewItem } from './newItem';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getItemById(id: String): Observable<any> { 
    return this.http.get<Item>(`${environment.apiBaseUrl}item/getItemById/${id}`);
  }
  
  getAllItemsByCollectionId(id: String): Observable<any> { 
    return this.http.get<Item[]>(`${environment.apiBaseUrl}item/getItemsByCollectionId/${id}`);
  }

  addItem(newItem: NewItem): Observable<any> { 
    return this.http.post<any>(`${environment.apiBaseUrl}item/addItem`, newItem);
  }
  
  editItem(editedItem: Item): Observable<any> { 
    return this.http.put<any>(`${environment.apiBaseUrl}item/editItem/${editedItem._id}`, editedItem);
  }
    
  removeItem(id: String): Observable<any> { 
    return this.http.delete<any>(`${environment.apiBaseUrl}item/removeItem/${id}`);
  } 
}
