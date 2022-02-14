import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Item } from './Item';
import { NewItem } from './newItem';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getItemById(id: String): Observable<any> { 
    return this.http.get<Item>(`${environment.apiBaseUrl}item/getItemById/${id}`);
  }
  
  getAllItemsByCollectionId(): Observable<any> { 
    return this.http.get<Item[]>(`${environment.apiBaseUrl}item/getAllItemsByCollectionId/`);
  }

  createItem(newItem: NewItem): Observable<any> { 
    return this.http.post<any>(`${environment.apiBaseUrl}item/createItem`, newItem);
  }
  
  editItem(editedItem: Item): Observable<any> { 
    return this.http.put<any>(`${environment.apiBaseUrl}item/editItem/`, editedItem);
  }
    
  removeItem(id: String): Observable<any> { 
    return this.http.delete<any>(`${environment.apiBaseUrl}item/removeItem/${id}`);
  } 
}
