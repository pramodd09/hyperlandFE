import { Component, OnInit, AfterViewInit, ViewChild, OnChanges, ViewEncapsulation } from '@angular/core';
import { SelectorService } from '../../services/selector.service';
import { ReportModule } from '../report.module';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { columnList } from '../report-column-list';

@Component({
  selector: 'app-booking-report',
  templateUrl: './booking-report.component.html',
  styleUrls: ['./booking-report.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookingReportComponent {

  firms: any[];
  property: any[];
  cities: any[];
  locations: any[];
  blocks: any[];
  plots: any[];
  loading1: boolean = false;
  loading2: boolean = false;
  loading3: boolean = false;
  reportForm: FormGroup;
  reportData;
columns=columnList["booking"];
undefinedVal = undefined;

  constructor(
    private selectorService: SelectorService,
    private fb: FormBuilder
  ) {
    this.reportForm = this.fb.group({
      'firmId': [null],
      'projectId': [null],
      'blockId': [null],
      'plotId': [null],
      'bookingDateFrom': [null],
      'bookingDateTo': [null],
    });
  }

  ngOnInit() {
    this.selectorService.getData("firm").subscribe(
      res => {
        this.firms = res.result;
      },
      error => {
        console.log('There was an error while retrieving firm' + error);
      }
    )
  }
  onChange(event, type) {
    // console.log("event.value "+event.value)
    
    // console.log(res);
  
    switch (type) {
      case 'project':
      this.loading1 = true;
      this.reportForm.controls['projectId'].setValue(undefined)
      this.reportForm.controls['blockId'].setValue(undefined)
      this.reportForm.controls['plotId'].setValue(undefined)
      this.selectorService.getDependentData(type, event.value).subscribe(
          res => {
            this.loading1 = false;
            this.property = res.result;
            console.log(this.property)
            this.blocks = [];
            this.plots = [];
          },
          error => {
            console.log('There was an error while retrieving data' + error);
            this.loading1 = false;
          }
        )
        break;
      case 'block':
      this.loading2 = true;
      this.reportForm.controls['blockId'].setValue(undefined)
      this.reportForm.controls['plotId'].setValue(undefined)
        this.selectorService.getDependentData(type, event.value).subscribe(
          res => {
            this.loading2 = false;
            this.blocks = res.result;
            console.log(this.blocks)
            this.plots = [];
          },
          error => {
            this.loading2 = false;
            console.log('There was an error while retrieving data' + error);
          }
        )
        break;
      case 'plot':
      this.loading3 = true;
      this.reportForm.controls['plotId'].setValue(undefined)
      console.log('block changed')
        this.selectorService.getDependentData(type, event.value).subscribe(
          res => {
            this.loading3 = false;
            console.log(res.result)
            this.plots = res.result;
            console.log(this.plots)
          },
          error => {
            this.loading3 = false;
            console.log('There was an error while retrieving data' + error);
          }
        )
        break;
      default:
        console.log('Sorry, we are out of ' + '.');
    }
  }

  onFormSubmit(form: NgForm) {
    console.log(form);
    this.selectorService.getReportData(form,'propertyAvailableStatus').subscribe( // TODO: make this booking
      res => {
        console.log(res);
        this.reportData = res;
      },
      error => {
        console.log('There was an error while retrieving report data' + error);
      }
    ) 
  }
}
