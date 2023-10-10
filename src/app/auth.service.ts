import { Injectable, TemplateRef } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../environments/environment';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private encryptionService: EncryptionService
  ) {}

  header = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + String(this.retrieveData()),
    }),
  };
  header1 = {
    observe: new HttpHeaders({ media_type: 'application/x-zip-compressed' }),
  };

  // base_url = 'http://localhost:8000';
  base_url = 'https://backend.claxon-ifrs17.com';
  // base_url = environment.apiUrl;
  URL20 = this.base_url + '/users/';

  retrieveData(): string | null {
    const encryptedData = localStorage.getItem('inittkn');
    if (encryptedData) {
      const decryptedData = this.encryptionService.decrypt(encryptedData);
      return decryptedData;
    } else {
      return null; // Return null if there's no encrypted data to retrieve
    }
  }

  auth() {
    let header_auth_guard = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + String(localStorage.getItem('token')),
      }),
    };
    let token = this.retrieveData();
    return this.http.get<any>(this.URL20 + token, header_auth_guard);
  }
}
