import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
import { CollectionId } from './CollectionId';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Collection } from './Collection';


@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  // getCollectionById(id: CollectionId): Observable<any> { 
  //   return this.http.get<any>(`${environment.apiBaseUrl}/collection/getCollectionById/${id}`, id );
  // }
  
  getCollectionByUserId(): Observable<any> { 
    return this.http.get<Collection[]>(`${environment.apiBaseUrl}collection/getCollectionsByUserId`);
  }

  // createCollection(): Observable<any> { 
  //   return this.http.post<any>(`${environment.apiBaseUrl}/collection/createCollection`, {});
  // }
  
  // editCollection(id: CollectionId): Observable<any> { 
  //   return this.http.post<any>(`${environment.apiBaseUrl}/collection/editCollection/${id}`, {} );
  // }
    
  //removeCollection(id: CollectionId): Observable<any> { 
    // return this.http.delete<any>(`${environment.apiBaseUrl}/collection/removeCollection`, id);
    //return this.http.delete<any>(environment.apiBaseUrl+"auth/registerUser", id)
  //} 
}
