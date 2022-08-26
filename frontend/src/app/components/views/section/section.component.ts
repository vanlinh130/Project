import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  constructor(public data: DataService, private messageService: MessageService) {
    this.data.getProfile();
  }

  ngOnInit() {}

  showSuccess1() {
    this.messageService.add({
      severity:'success',
      summary: 'Book Mark',
      detail: 'Thank you for your book mark <3'});
  }

  showSuccess2() {
    this.messageService.add({
      severity:'success',
      summary: 'Heart',
      detail: 'Thank you for your heart <3'});
  }

  showInfo() {
    this.messageService.add({
      severity:'info',
      summary: 'No account',
      detail: 'No account !!'});
  }

}
