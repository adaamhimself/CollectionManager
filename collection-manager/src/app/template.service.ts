import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Template } from '@angular/compiler/src/render3/r3_ast';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http: HttpClient) { }

  getTemplateById(id: string): Observable<any> {
    return this.http.get<Template>(`${environment.apiBaseUrl}storage/getStorageDetails/${id}`);
  }
}
