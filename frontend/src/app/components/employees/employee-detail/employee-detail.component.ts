import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})

export class EmployeeDetailComponent implements OnInit {

  // Khai báo các trường dữ liệu để hiển thị lên form
  employee!: Employee;
  url = 'http://localhost:3030/v1/api/accounts';
  id: string;

  constructor(
    private rest: RestApiService,
    private data: DataService,
    private route: ActivatedRoute,) {
      this.id = route.snapshot.params['id'];
    }

  // Khởi tạo thuộc tính employee lấy về từ phía server
  ngOnInit() {
    this.rest.getOne(this.url, this.id).then(data => {
      this.employee = (data as {employee : Employee}).employee;
    })
  }
}
