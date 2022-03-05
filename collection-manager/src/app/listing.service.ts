import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Listing } from './listing';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private http: HttpClient) { }

  getListingById(id: String): Observable<any> {
    return this.http.get<Listing>(`${environment.apiBaseUrl}listing/getListingById/${id}`);
  }

  getTradingListingsByCategory(id: String): Observable<any> {
    return this.http.get<Listing>(`${environment.apiBaseUrl}listing/getTradingListingsByCategory/${id}`);
  }

  getSellingListingsByCategory(id: String): Observable<any> {
    return this.http.get<Listing>(`${environment.apiBaseUrl}listing/getSellingListingsByCategory/${id}`);
  }

  getWantedListingsByCategory(id: String): Observable<any> {
    return this.http.get<Listing>(`${environment.apiBaseUrl}listing/getWantedListingsByCategory/${id}`);
  }

  createListing(newListing: Listing): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}listing/createListing`, newListing);
  }

  modifyListing(id: String, editedListing: Listing): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}item/editItem/${editedListing._id}`, editedListing);
  }

  deleteListing(id: String): Observable<any> {
    return this.http.delete<any>(`${environment.apiBaseUrl}listing/deleteListing/${id}`);
  }

}
