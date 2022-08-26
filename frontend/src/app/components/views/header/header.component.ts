import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  employees!: Employee[];
  visibleSidebar: any;
  avatarSidebar : any;
  ellipsisSidebar : any;

  constructor(
    public data: DataService,
    private router: Router,
    private primengConfig: PrimeNGConfig) {
      this.data.getProfile();
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  visibleAvatar() {
    if (this.primengConfig.ripple) {
      this.avatarSidebar = true && !this.avatarSidebar ;
    }
  }

  visileEllipsis() {
    if (this.primengConfig.ripple) {
      this.ellipsisSidebar = true && !this.ellipsisSidebar;
    }
  }

  logout() {
    this.data.employee = null;
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
