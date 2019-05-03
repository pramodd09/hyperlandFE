import { Component, OnInit, AfterViewInit, ViewChild, OnChanges, ViewEncapsulation } from '@angular/core';
import { SelectorService } from '../../services/selector.service';
import { ReportModule } from '../report.module';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-property-report',
  templateUrl: './property-report.component.html',
  styleUrls: ['./property-report.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PropertyReportComponent {

  firms: any[];
  property: any[];
  cities: any[];
  locations: any[];
  blocks: any[];
  plots: any[];
  status:any[];
  loading: boolean = false;
  reportForm: FormGroup;
  reportData;
  bookingStatus:string;
statuses:any[] = [{  
  value:"Booked"
},
{  
  value:"Available"
},{
  value:"Hold"
}
];
  constructor(
    private selectorService: SelectorService,
    private fb: FormBuilder
  ) {
    this.reportForm = this.fb.group({
      'firmId': [null],
      'projectId': [null],
      'blockId': [null],
      'plotId': [null],
      'status':[null]
    });
  }

  ngOnInit() {
    this.selectorService.getData("firm").subscribe(
      res => {
        this.firms = res.result;
        // console.log("firms")
        // console.log(this.firms);
      },
      error => {
        console.log('There was an error while retrieving firm' + error);
      }
    )
  }
  onChange(event, type) {
    this.loading = true;
    this.selectorService.getDependentData(type, event.value).subscribe(
      res => {
        // console.log(res);
        this.loading = false;
        switch (type) {
          case 'property':
            this.property = res.result;
            this.blocks = [];
            this.plots = [];
            break;
          case 'block':
            this.blocks = res.result;
            this.plots = [];
            break;
          case 'plot':
            this.plots = res.result;
            break;

          default:
            console.log('Sorry, we are out of ' + '.');
        }

      },
      error => {
        console.log('There was an error while retrieving data' + error);
      }
    )
  }

  onFormSubmit(form: NgForm) {
    console.log(form);
    this.bookingStatus=form.status;
    var type = 'propertyAvailableStatus';
    if(form.status=='Booked'){type='propertyBookedStatus'}
    else if(form.status=='Hold'){type='propertyHoldStatus'}
    this.selectorService.getReportData(form,type).subscribe(
      res => {
        console.log(res);        
        this.reportData = res;
      },
      error => {
        console.log('There was an error while retrieving report data' + error);
      }
    )
    // console.log(form)    
  }
}
