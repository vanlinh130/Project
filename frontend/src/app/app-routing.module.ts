import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { EmployeeAddComponent } from './components/employees/employee-add/employee-add.component';
import { EmployeeListComponent } from './components/employees/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employees/employee-edit/employee-edit.component';
import { EmployeeDetailComponent } from './components/employees/employee-detail/employee-detail.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { PageHelpComponent } from './components/views/page-help/page-help.component';
import { PageFoundComponent } from './components/views/page-found/page-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'employee-add', component: EmployeeAddComponent },
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'employee-edit/:id', component: EmployeeEditComponent },
  { path: 'employee-detail/:id', component:  EmployeeDetailComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component:  RegisterComponent},
  { path: 'help', component: PageHelpComponent },

  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', component: PageFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
