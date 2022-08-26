import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Lưu thông tin employee hiên đang đăng nhập vào hệ thống
  employee!: Employee | null;

  constructor(private rest: RestApiService) {}

  async getProfile() {
    try {
      if (localStorage.getItem('token')) {
        const data = await this.rest.get(
          'http://localhost:3030/v1/api/accounts/get/profile'
        );
        this.employee = (data as { employee: Employee }).employee;
      }
    } catch (error) {}
  }
}
