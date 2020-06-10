import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContentListService {

  testurl = 'http://localhost:4001';

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getRootContent(): any {
    return this.http.get(this.testurl + '/content');
  }

  getContent(id): any {
    return this.http.get(this.testurl + '/content/parent_id/' + id);
  }

  post_dir(dir: any): Observable<any> {
    console.log('clalled');
    const item = {directory: dir};
    return this.http.post<any>(this.testurl + '/content/dir/add', JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  upload_file(formData) {
    return this.http
    .post(this.testurl + '/content/file/upload', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
