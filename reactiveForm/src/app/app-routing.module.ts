import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponentComponent } from "./base-component/base-component.component";
import {ViewPersonalDetailComponent} from "./view-personal-detail/view-personal-detail.component";
import {EditPersonalDetialComponent} from "./edit-personal-detial/edit-personal-detial.component";
import {ReactiveFromComponent} from "./reactive-from/reactive-from.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TablePersonalDetailComponent} from "./table-personal-detail/table-personal-detail.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '',
    component: BaseComponentComponent,
    children: [
      {
        path: 'home',
        component: DashboardComponent
      },
      {
        path: 'reactive-form',
        component: ReactiveFromComponent
      },
      {
        path: 'show-details',
        component: TablePersonalDetailComponent
      },
      {
        path: 'viewPersonalDetail/:id',
        component: ViewPersonalDetailComponent
      },
      {
        path: 'editPersonalDetail/:id',
        component: EditPersonalDetialComponent
      }

    ]
  },
  // { path: 'viewPersonalDetail/:id', component: ViewPersonalDetailComponent },
  // { path: 'editPersonalDetail/:id', component: EditPersonalDetialComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
