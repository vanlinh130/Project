import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.scss']
})
export class EmployeeDeleteComponent  {

  @Input() icon = '';

  @Output() deleteRequest = new EventEmitter<string>();

  delete() {
    this.deleteRequest.emit(this.icon);
  }
}
