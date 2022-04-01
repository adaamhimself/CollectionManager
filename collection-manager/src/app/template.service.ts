import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Template } from './Template';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http: HttpClient) { }

  getTemplateById(id: String): Observable<any> {
    return this.http.get<Template>(`${environment.apiBaseUrl}template/getTemplateByItemId/${id}`);
  }

}