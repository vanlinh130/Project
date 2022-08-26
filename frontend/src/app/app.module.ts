import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { CarouselModule } from 'primeng/carousel';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from 'primeng/toolbar';
import { TreeSelectModule } from 'primeng/treeselect';
import { StepsModule } from 'primeng/steps';
import { SkeletonModule} from 'primeng/skeleton';
import { StyleClassModule } from 'primeng/styleclass';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule} from 'primeng/inputtextarea';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from "primeng/api";
import { ConfirmationService } from 'primeng/api';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/views/home/home.component';
import { EmployeeAddComponent } from './components/employees/employee-add/employee-add.component';
import { EmployeeListComponent } from './components/employees/employee-list/employee-list.component';
import { EmployeeDeleteComponent } from './components/employees/employee-delete/employee-delete.component';
import { EmployeeEditComponent } from './components/employees/employee-edit/employee-edit.component';
import { EmployeeDetailComponent } from './components/employees/employee-detail/employee-detail.component';
import { HeaderComponent } from './components/views/header/header.component';
import { NavigationComponent } from './components/views/navigation/navigation.component';
import { SectionComponent } from './components/views/section/section.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { FooterComponent } from './components/views/footer/footer.component';
import { PageHelpComponent } from './components/views/page-help/page-help.component';
import { PageFoundComponent } from './components/views/page-found/page-found.component';

import { AppRoutingModule } from './app-routing.module';
import { DataService } from './services/data.service';
import { RestApiService } from './services/rest-api.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeAddComponent,
    EmployeeListComponent,
    EmployeeEditComponent,
    EmployeeDetailComponent,
    EmployeeDeleteComponent,
    HeaderComponent,
    NavigationComponent,
    SectionComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    PageHelpComponent,
    PageFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    AppRoutingModule,
    CardModule,
    CalendarModule,
    CarouselModule,
    CheckboxModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    ToastModule,
    TableModule,
    ToolbarModule,
    TreeSelectModule,
    StepsModule,
    SidebarModule,
    SkeletonModule,
    StyleClassModule,
    BadgeModule,
    ButtonModule,
    BrowserAnimationsModule,
    DialogModule,
    DropdownModule,
    RippleModule,
    RadioButtonModule,
    InputTextModule,
    InputTextareaModule,
    FileUploadModule,
  ],
  providers: [
    DataService,
    RestApiService,
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
