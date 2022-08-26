import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {

  employee: Employee;
  addForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  url = 'http://localhost:3030/v1/api/accounts';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(
    private rest: RestApiService,
    private data: DataService,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder,) {
    this.employee = new Employee();
  }

  employeeForm: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    enrollDate: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required) ,
  })

  ngOnInit() {
    this.employee.gender = 'Male';
    this.employee.enrollDate = new Date();
  }

  validate() {
    return true;
  }

  onSubmit() {
    if (!this.employeeForm.valid) {
      console.log('Invalid data');
      return;
    }
    this.save();
    console.log(this.employeeForm.value);
  }

  save() {
    // Kiểm tra kiểu dữ liệu có hợp lệ hay không
    if (this.validate()) {
      this.rest.post(this.url, this.employee).then(data => {
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
      severity: 'error',
      summary: 'Add',
      detail: 'Add employee failed !!'
    });
  }
}
