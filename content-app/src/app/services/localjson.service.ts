import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LocaljsonService {

  constructor(private http: HttpClient) { }

  getMenuList() {
    return this.http
      .get('assets/localjson/content-menu.json')
      .pipe(map(x => x));
  }
}
