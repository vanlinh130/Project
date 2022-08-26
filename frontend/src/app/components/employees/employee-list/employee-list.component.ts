import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  // Khai báo các trường dữ liệu để hiển thị lên form
  employees!: Employee[];
  selectedEmployees!: Employee[];
  url = 'http://localhost:3030/v1/api/accounts';

  icon = 'pi pi-trash'

  constructor(private rest: RestApiService,
    private data: DataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    ) {
  }

  // Gữi tới server và gọi phương thức GET để lấy về thông tin của employee
  ngOnInit() {
    this.rest.get(this.url).then(data => {
      this.employees = (data as { employees: Employee[]}).employees;
    })
  }

  delete(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected employees?',
      header: 'Confirm',
      icon: 'pi pi-trash',
      accept: () => {
        this.rest.delete(this.url, id).then(data => {
          this.employees = (data as { employees: Employee[]}).employees;
          this.ngOnInit();
          this.showSuccess()
        })
      }
    });
  }

  deleteSelectedEmployees() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected employees?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employees = this.employees.filter(val => !this.selectedEmployees.includes(val));
        this.showSuccess();
      }
    });
  }

  showSuccess() {
    this.messageService.add({
      severity:'success',
      summary: 'Success',
      detail: 'Delete employee successfully'
    });
  }
}
