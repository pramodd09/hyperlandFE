import{Component, OnInit, ViewChild, Inject, ChangeDetectorRef}from '@angular/core';
import {TransactionService }from '../../services/transaction.service';
import {MatRadioModule} from '@angular/material/radio';
import {Booking }from '../../model/Booking';
import {Customer}from '../../model/Booking';
import {Payment}from '../../model/Booking';
import {FormControl,FormGroup, FormArray,FormBuilder, Validators, NgForm}from '@angular/forms';
import { SelectorService } from '../../services/selector.service';
import { MasterService } from '../../services/master.service';
@Component({
selector: 'app-booking-form',
templateUrl: './booking-form.component.html',
styleUrls: ['./booking-form.component.scss']
})


export class BookingFormComponent implements OnInit {


bookingForm: FormGroup;
booking : Booking;
step = 0;
index = 0;
firmList : any[];
propertyList: any[];
blockList: any[];
plotNumberList:any[];
isLoading = false;
totalFixedAmount = 0;

setStep(index: number) {
          this.step = index;
        }

        nextStep() {
          this.step++;
        }

        prevStep() {
          this.step--;
        }
  constructor(  private fb: FormBuilder,public transactionService : TransactionService,
                  private changeDetectorRefs: ChangeDetectorRef,
                  private selectorService: SelectorService,
                  private masterService: MasterService) {


    }

  ngOnInit() {
       this.booking = new Booking();
       this.booking.bookingDate = new Date();
       this.bookingForm = this.fb.group({
        'firmId': [null],
        'projectId': [null],
        'propertyTypeId': [null],
        'blockId': [null],
        'agentId':[null],
        'plotNumber':[null],
        'paymentType':[null],
        'receiptNumber':[null],
        'bookingDate':[null],
        'baseSellingPrice':[null],
        'plcChargesType':[null],
        'plcCharges':[null],
        'bookingType':[null],
        'numberOfInstallment':[null],
        'additionalCharges':[null],
        'installmentStartDate':[null],
        'receiptNo' : [null],
        'plotSize' :[null],
        'sqftRate' :[null],
        'totalAmount' : [null],
        'bank': [null],
        bookingAmount : [null],
        agentName : [null],
        paymentMode : [null],
        chequeNumber : [null],
        transactionId :[null],
        transactionDate : [null],
        chequeDate :[null],
        installmentAmount : [null],
        discount : [null],
        discountType : [null],
        customerDetails : this.initCustomerDetails(),
        coApplicantDetails : this.fb.array([])
      });
        this.selectorService.getData("firm").subscribe(
        res => {
        console.log("dsdsds");

          this.firmList=res.result;
          console.dir(this.firmList);
        },
        error => {
          console.log('There was an error while retrieving Albums !!!' + error);
        }
  )
     /* this.bookingForm.get('agentName')
            .valueChanges
            .pipe(
              debounceTime(300),
              tap(() => this.isLoading = true),
              switchMap(value => this.appService.search({name: value}, 1)
              .pipe(
                finalize(() => this.isLoading = false),
            )
           )
          ).subscribe(users => this.filteredUsers = users.results);*/

  }
addNewCoApplicant(){

    const coApplicantDetails = this.bookingForm.get('coApplicantDetails') as FormArray;
    console.dir(coApplicantDetails);
    coApplicantDetails.push(this.fb.group({
        'customerName':[null],
        'panNumber':[null],
        'dateOfBirth':[null],
        'adhaarNo':[null],
        'relationType':[null],
        'relativeName':[null],
  }));
}

get coApplicantDetailsForm() {
  return this.bookingForm.get('coApplicantDetails') as FormArray
}


initCoApplicantDetails(){
 return this.fb.group({
        'customerName':[null,Validators.required],
        'panNumber':[null,Validators.required],
        'adhaarNo':[null,Validators.required],
        'relationType':[null,Validators.required],
        'relativeName':[null,Validators.required],
  })
}

initCustomerDetails(){
  this.booking.customerDetails = new Customer();
   return this.fb.group({
        'customerName':[null],
        'panNumber':[null],
        'adhaarNo':[null],
        'address':[null],
        'city':[null],
        'state':[null],
        'pinCode':[null],
        'emailId':[null],
        'phoneNo':[null],
        'dateOfBirth':[null],
        'occupation':[null],
        'relationType':[null],
        'relativeName':[null],
   });
  }

 onChange(event,type){
    // console.log(event)
    var value = event;
    var code =  value.split('|')[0];
    var value1 = value.split('|')[1];

    console.log(value1+"  -- >"+code);
   if(type == "plotdetails"){
       this.masterService.getDataById('plot',code).subscribe(
      res => {
         this.booking.sqftRate = parseFloat(res.result.sqftRate);
         this.booking.plotSize = parseFloat(res.result.plotSize);
         this.booking.baseSellingPrice = this.booking.sqftRate * this.booking.plotSize ;

    //     this.booking.plcChargesType  = 'Fixed';
      if(this.booking.plcCharges)
      {
        if(this.booking.plcChargesType == 'Fixed')
        {
             this.booking.totalAmount = this.booking.baseSellingPrice + this.booking.plcCharges ;

        }
        else{
             this.booking.totalAmount = this.booking.baseSellingPrice + (this.booking.baseSellingPrice * this.booking.plcCharges ) / 100;
        }
      }
      else
      {
         this.booking.totalAmount = this.booking.baseSellingPrice  ;
         this.booking.plcCharges = 0;
         this.booking.plcChargesType  = 'Fixed';
      }
      this.totalFixedAmount =  this.booking.totalAmount;
      },
      error => {
        console.log('There was an error while retrieving data !!!' + error);
      });
    }
    else {
    this.selectorService.getDependentData(type,code).subscribe(
      res => {
        if(type == 'block')
          this.blockList = res.result;
        else if (type == 'property')
           this.propertyList=res.result;
        else if(type == 'plot')
          this.plotNumberList = res.result;
        console.dir(this.propertyList);
      },
      error => {
        console.log('There was an error while retrieving Albums !!!' + error);
      }
    )
   }
  }

  submitForm() {

       var bookingDetails = this.bookingForm.value;
        if( bookingDetails.firmId){
         var code =  bookingDetails.firmId.split('|')[0];
         var value1 = bookingDetails.firmId.split('|')[1];
        bookingDetails.firmId = code;
        bookingDetails.firmName = value1;
      }
        if( bookingDetails.projectId){
         var code =  bookingDetails.projectId.split('|')[0];
         var value1 = bookingDetails.projectId.split('|')[1];
        bookingDetails.projectId = code;
        bookingDetails.projectName = value1;
      }
        if(bookingDetails.blockId){
        var code =  bookingDetails.blockId.split('|')[0];
        var value1 = bookingDetails.blockId.split('|')[1];
        bookingDetails.blockId = code;
        bookingDetails.blockName = value1;
        }
      console.log(bookingDetails);
       this.transactionService.createBooking(bookingDetails).subscribe(
          res => {
            console.log(res);
          },
          error => {
            console.log('There was an error while retrieving Albums !!!' + error);
           // this.openSnackBar('Error while creating additionalCharges, Please contact your adminstrator','');
          });
      }

reCalculateInstallment(event){

     var value;
     console.log('reCalculateInstallment -- '+value)
    if(event)
       value = parseInt(event);
    this.calculateInstallment(value);

}
calculateInstallment(numberOfInstallment){
    if(numberOfInstallment == undefined)
        numberOfInstallment = this.booking.numberOfInstallment;
   console.log(this.booking.totalAmount);
   console.log(this.booking.bookingAmount +" --- "+this.booking.numberOfInstallment);
   if(numberOfInstallment)
      this.booking.installmentAmount = (Math.ceil((this.booking.totalAmount - this.booking.bookingAmount)/numberOfInstallment));
   console.log(  this.booking.installmentAmount);
 }


updateDiscount()
{
    if(this.booking.discountType)
    {
         if(this.booking.discountType == 'Fixed')
        {
          this.booking.totalAmount = this.totalFixedAmount - this.booking.discount;
        }
        else{
          this.booking.totalAmount = this.totalFixedAmount - (this.booking.totalAmount * this.booking.discount /100);
        }
    }
}
applyDiscount(event)
{
  console.log(event.value);

   if(event.value == 'Fixed')
   {
      this.booking.totalAmount = this.totalFixedAmount - this.booking.discount;
    }
  else{
      this.booking.totalAmount =  this.totalFixedAmount - (this.totalFixedAmount * this.booking.discount /100);
    }
 }
}
