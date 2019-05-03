import { Component, OnInit, AfterViewInit, ViewChild, OnChanges, ViewEncapsulation } from '@angular/core';
import { SelectorService } from '../../services/selector.service';
import { ReportModule } from '../report.module';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { formatDate } from '@angular/common';
import { columnList } from '../report-column-list';
@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransactionReportComponent implements OnInit {
  property: any[];
  firms: any[];
  locations: any[];
  blocks: any[];
  plots: any[];
  products: any[];
  units: any[];
  loading: boolean = false;
  reportForm: FormGroup;
  reportData;
  columns = columnList["transaction"];
  undefinedVal = undefined;

  constructor(
    private selectorService: SelectorService,
    private fb: FormBuilder
  ) {
    this.reportForm = this.fb.group({
      'firmId': [null],
      'blockId': [null],
      'projectId': [null],
      'plotId': [null],
      'unitId': [null],
      'productId': [null],
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
    this.loading = true;
    // console.log(res);
    this.loading = false;
    switch (type) {
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
            console.log(this.blocks)
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
        this.selectorService.getDependentData(type, event.value).subscribe(
          res => {
            console.log(res.result)
            this.plots = res.result;
            console.log(this.plots)
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
    console.log(form);
    this.selectorService.getReportData(form,'propertyAvailableStatus').subscribe( // TODO: make this transaction
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
