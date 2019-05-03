import { Component, OnInit } from '@angular/core';
import { IEmployee } from 'ng2-org-chart';

@Component({
  selector: 'app-viewtransaction',
  templateUrl: './viewtransaction.component.html',
  styleUrls: ['./viewtransaction.component.scss']
})
export class ViewtransactionComponent implements OnInit {

  constructor() { 

    this.topEmployee=[ {
      name: 'Janis Martin',
      designation: 'CEO',
      img: "",
      subordinates: [
          {
              name: 'Matthew Wikes',
              designation: 'VP',
              img: "",
              subordinates: [
                  {
                      name: 'Tina Landry',
                      designation: 'Budget Analyst',
                      subordinates: [],
                      img: ""
                  }
              ]
          },
          {
              name: 'Patricia Lyons',
              designation: 'VP',
              img: "",
              subordinates: [
                  {
                      name: 'Dylan Wilson',
                      designation: 'Web Manager',
                      img: "",
                      subordinates: []
                  },
                  {
                      name: 'Deb Curtis',
                      designation: 'Art Director',
                      img: "",
                      subordinates: []
                  }
              ]
          },
          {
              name: 'Larry Phung',
              designation: 'VP',
              img: "",
              subordinates: []
          }
      ]}
    ];
  }

  topEmployee: IEmployee [];

  links = ['Expenses', 'Farmer Payment', 'Associate Payment'];
  activeLink = this.links[0];

  ngOnInit() {
    console.log("activeLink:",this.activeLink);
  }

}
