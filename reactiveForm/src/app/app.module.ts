import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFromComponent } from './reactive-from/reactive-from.component';
import {FormsModule} from "@angular/forms";
import {CommonModule, DatePipe, NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
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
    TablePersonalDetailComponent
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
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
