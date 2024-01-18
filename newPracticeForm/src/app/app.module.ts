import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFromComponent } from './reactive-from/reactive-from.component';
import {FormsModule} from "@angular/forms";
import {CommonModule, DatePipe, NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import { NepaliFontPipe } from './pipes/nepali-font.pipe';
import {AgeFormatterPipe} from "./pipes/ageFormatter.pipe";
import { BaseComponentComponent } from './base-component/base-component.component';
import { RouterOutlet} from "@angular/router";
import { ViewPersonalDetailComponent } from './view-personal-detail/view-personal-detail.component';
import { EditPersonalDetialComponent } from './edit-personal-detial/edit-personal-detial.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TablePersonalDetailComponent } from './table-personal-detail/table-personal-detail.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from 'ngx-toastr';
import {ConfirmationPopoverModule} from "angular-confirmation-popover";
import { LoginComponent } from './login/login.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { FilesComponent } from './files/files.component';
// import {ErrorInterceptor} from "./interceptors/error.interceptor";



@NgModule({
  declarations: [
    AppComponent,
    ReactiveFromComponent,
    NepaliFontPipe,
    AgeFormatterPipe,
    BaseComponentComponent,
    ViewPersonalDetailComponent,
    EditPersonalDetialComponent,
    HeaderComponent,
    SideNavComponent,
    FooterComponent,
    DashboardComponent,
    TablePersonalDetailComponent,
    LoginComponent,
    FilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    CommonModule,
    NgIf,
    HttpClientModule,
    RouterOutlet,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      positionClass: "toast-top-right",
      preventDuplicates:true,
      timeOut: 3000
    }),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType:'danger'
    })
  ],
  providers: [DatePipe,
    provideHttpClient(withInterceptors([AuthInterceptor])),
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
