import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  // Khai báo các trường dữ liệu để hiển thị lên form
  employee!: Employee;
  url = 'http://localhost:3030/v1/api/accounts';
  id: string;
  submitted: boolean = false;
  emailPattern  = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(
    private rest: RestApiService,
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder) {
      this.id = route.snapshot.params['id'];
  }

  employeeForm: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    date: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
  })

  // Khởi tạo thuộc tính employee lấy về từ phía server
  ngOnInit() {
    this.rest.getOne(this.url, this.id).then(data => {
      this.employee = (data as { employee: Employee }).employee;
    })
  }

  validate() {
    return true;
  }

  update() {
    // Kiểm tra kiểu dữ liệu có hợp lệ hay không
    if (this.validate()) {
      this.rest.put(this.url, this.id, this.employee).then(data => {
        this.showSuccess();
        this.router.navigate(['./employee-list'])
      })
      .catch(_error => {
        this.nextPage()
        this.showError()
      })
    }
  }

  nextPage() {
    if (this.employee.name && this.employee.phone &&
        this.employee.enrollDate && this.employee.work &&
        this.employee.email && this.employee.password &&
        this.employee.gender && this.employee.status &&
        this.employee.role) {
      return;
    }
    this.submitted = true;
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Add',
      detail: 'Add employee successfully'
    });
  }

  showError() {
    this.messageService.add({
      severity:'error',
      summary: 'Add',
      detail: 'Add employee failed !!'});
  }
}
