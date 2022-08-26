import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }

  // để lấy về giá trị của token khi thực hiện đăng nhập , đăng nhập thành công sẽ lưu vào localStorage
  getHeaders() {
    const token = localStorage.getItem('token');
    return token? new HttpHeaders().set('Authorization', 'Bearer ' + token) : null;
  }

  // trả về tất cả dự liệu từ server
  get(link: string) {
    let headers = this.getHeaders();
    if (headers instanceof HttpHeaders)
      return this.http.get(link, { headers: headers }).toPromise();
    return this.http.get(link).toPromise();
  }

  // trả về 1 thông tin từ server theo id
  getOne(link: string, id: string) {
    let headers = this.getHeaders();
    if (headers instanceof HttpHeaders)
      return this.http.get(link + '/' + id, { headers: headers }).toPromise();
    return this.http.get(link + '/' + id).toPromise();
  }

  // lưu thông tin
  post(link: string, body: any) {
    let headers = this.getHeaders();
    if (headers instanceof HttpHeaders)
      return this.http.post(link, body, { headers: headers }).toPromise();
    return this.http.post(link, body).toPromise();
  }

  // cập nhật thông tin
  put(link: string, id: string, body: any) {
    let headers = this.getHeaders();
    if (headers instanceof HttpHeaders)
      return this.http.put(link + '/' + id, body, { headers: headers }).toPromise();
    return this.http.put(link + '/' + id, body).toPromise();
  }

  // Xóa thông tin
  delete(link: string, id: string) {
    let headers = this.getHeaders();
    if (headers instanceof HttpHeaders)
      return this.http.delete(link + '/' + id, { headers: headers }).toPromise();
    return this.http.delete(link + '/' + id).toPromise();
  }
}
