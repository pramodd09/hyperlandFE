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
  loading: boolean = false;
  reportForm: FormGroup;
  reportData;
columns=columnList["booking"];

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
    this.loading = true;
    this.selectorService.getDependentData(type, event.value).subscribe(
      res => {
        // console.dir(res);
        this.loading = false;
        switch (type) {
          case 'project':
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

    this.selectorService.getReportData(form).subscribe(
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
