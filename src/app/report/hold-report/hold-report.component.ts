import { Component, OnInit, AfterViewInit, ViewChild, OnChanges, ViewEncapsulation } from '@angular/core';
import { SelectorService } from '../../services/selector.service';
import { ReportModule } from '../report.module';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { columnList } from '../report-column-list';

@Component({
  selector: 'app-hold-report',
  templateUrl: './hold-report.component.html',
  styleUrls: ['./hold-report.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HoldReportComponent {

  firms: any[];
  property: any[];
  cities: any[];
  locations: any[];
  blocks: any[];
  plots: any[];
  status: any[];
  action: string;
  loading: boolean = false;
  reportForm: FormGroup;
  reportData;
  bookingStatus: string;
  undefinedVal = undefined;
  // columns=columnList["property"];
  statuses: any[] = [{
    valueAction: "Hold",
    valueSend:"Available"

  },
  {
    valueAction: "UnHold",
    valueSend:"Booked"
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
      'status': [null]
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
    // console.log("event.value "+event.value)
    this.loading = true;
    // console.log(res);
    this.loading = false;
    switch (type) {
      case 'action':
        if (event.value == 'Hold') this.action = 'Available';
        else if (event.value == 'UnHold') this.action = 'Hold';        
        break;
      case 'project':
      this.reportForm.controls['projectId'].setValue(undefined)
      this.reportForm.controls['blockId'].setValue(undefined)
      this.reportForm.controls['plotId'].setValue(undefined)
      this.selectorService.getDependentData(type, event.value).subscribe(
          res => {
            this.property = res.result;
            console.log(this.property)
            this.blocks = [];
            this.plots = [];
          },
          error => {
            console.log('There was an error while retrieving data' + error);
          }
        )
        break;
      case 'block':
      this.reportForm.controls['blockId'].setValue(undefined)
      this.reportForm.controls['plotId'].setValue(undefined)
        this.selectorService.getDependentData(type, event.value).subscribe(
          res => {
            this.blocks = res.result;
            this.plots = [];
          },
          error => {
            console.log('There was an error while retrieving data' + error);
          }
        )
        break;
      case 'plot':
      this.reportForm.controls['plotId'].setValue(undefined)
      console.log('block changed')
        this.selectorService.getDependentDataPlotByAction(this.action, event.value).subscribe(
          res => {
            console.log(res.result)
            this.plots = res.result;
          },
          error => {
            console.log('There was an error while retrieving data' + error);
          }
        )
        break;
      default:
        console.log('Sorry, we are out of ' + '.');
    }
  }



  onFormSubmit(form: NgForm) {
    // console.log(form);
    this.bookingStatus = form.status;
    var type = 'propertyAvailableStatus';
    // if (form.status == 'Booked') { type = 'propertyBookedStatus' }
    if (form.status == 'UnHold') { type = 'propertyHoldStatus' }
    this.selectorService.getReportData(form, type).subscribe(
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
