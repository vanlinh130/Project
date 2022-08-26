import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Khai báo các trường dữ liệu để hiển thị lên form
  employee: Employee;
  url = 'http://localhost:3030/v1/api/accounts/login';
  submitted: boolean = false;

  constructor(
    private rest: RestApiService,
    private data: DataService,
    private router: Router,
    private messageService: MessageService) {
    this.employee = new Employee();
  }

  ngOnInit() {}

  validate() {
    return true;
  }

  async login() {
    if (this.validate()) {
      this.rest.post(this.url, this.employee).then(async data => {
        let value = data as { employeeId: string, token: string };
        localStorage.setItem('token', value.token);
        await this.data.getProfile();
        this.showSuccess();
        this.router.navigate(['/home']);
      })
      .catch(_error => {
        this.nextPage();
        this.showError();
      })
    }
  }

  nextPage() {
    if (this.employee.email && this.employee.password) { return; }
    this.submitted = true;
  }

  showSuccess() {
    this.messageService.add({
      severity:'success',
      summary: 'Successfully',
      detail: 'Logged in successfully'});
  }

  showError() {
    this.messageService.add({
      severity:'error',
      summary: 'Failed',
      detail: 'Login failed !!'});
  }
}
