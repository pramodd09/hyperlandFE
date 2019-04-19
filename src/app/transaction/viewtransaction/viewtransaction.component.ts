import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewtransaction',
  templateUrl: './viewtransaction.component.html',
  styleUrls: ['./viewtransaction.component.scss']
})
export class ViewtransactionComponent implements OnInit {

  constructor() { }

  links = ['Expenses', 'Farmer Payment', 'Associate Payment'];
  activeLink = this.links[0];

  ngOnInit() {
    console.log("activeLink:",this.activeLink);
  }

}
