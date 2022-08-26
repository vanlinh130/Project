import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  employees!: Employee[];
  url = 'http://localhost:3030/v1/api/accounts';
  responsiveOptions;

  constructor(private rest: RestApiService,
    public data: DataService,
    private messageService: MessageService) {
      this.data.getProfile();

      this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '900px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];
  }

  // Khởi tạo thuộc tính employee lấy về từ phía server
  ngOnInit() {
    this.rest.get(this.url).then(data => {
      this.employees = (data as { employees: Employee[]}).employees;
    })
  }

  showSuccess() {
    this.messageService.add({
      severity:'success',
      summary: 'Heart',
      detail: 'Thank you for your heart <3'});
  }
}
