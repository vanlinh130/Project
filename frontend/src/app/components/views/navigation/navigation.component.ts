import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  visibleSidebar: any;

  constructor(
    public data: DataService,
    private router: Router) {
    this.data.getProfile();
  }

  ngOnInit() {}

  logout() {
    this.data.employee = null;
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
