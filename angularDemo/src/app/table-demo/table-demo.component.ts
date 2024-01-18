import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-demo.component.html',
  styleUrl: './table-demo.component.scss'
})
export class TableDemoComponent {
  userDetails : any []=[
  {
    name : 'Ram karki',
    age: '21',
    address: 'Tilganga'
  },
  {
      name : 'Pasang 69',
      age: '21',
      address: 'Thamel'
  }
  ]
}
