import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { SharedDataService } from 'src/app/Service/shared-data.service';
import { UsersService } from 'src/app/Service/users.service';
import { SigninComponent } from '../signin/signin.component';

declare var $: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public isPersonal: boolean = true;

  public inputType = 'password';
  public class = 'fa fa-eye';
  public validate: boolean = false;
  public verifyMOtp: boolean = false;
  NumberMask = null;

  RegistrationForm: FormGroup;

  GSTNo: any;
  PANNo: any;
  AadharCard: any;

  phoneMask = null;
  showMask: boolean = false;
  public verified: boolean = false;
  public mobileverified: boolean = false;

  public counter;

  loginStart: boolean = false;
  submitted: boolean = false;
  VerifyStart: boolean = false;

  public mvaldate: boolean = true;

  emailOTP: boolean = false;
  mobileOTP: boolean = false;
  mobileotpSendStart: boolean;
  errorShow: number = 1;
  mobilecode: string = "";
  PhoneMask: string;
  BusinessPhone: any;
  PinCodeMask: string;
  txtPinCode: any;
  AadharNumberMask: string;
  Personal: number;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    //private toastr: ToastrService,
    private _SharedDataService: SharedDataService,
    public toastController: ToastController,
    private modalController: ModalController
  ) {

  }

  @ViewChild("SetFocus") nameField: ElementRef
  setFocus(): void {
    this.nameField.nativeElement.focus();
  }

  get OTPFormArray() {
    return this.RegistrationForm.controls.OTPArray as FormArray;
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  keyupEvent(event) {
    debugger;
  }

  keypressEvent(event) {
    debugger;
  }

  addMask(args) {

    this.NumberMask = "000000";
    this.showMask = true;

    args.selectionEnd = args.selectionStart;
  }

  addAadharMask(obj: object) {
    this.AadharNumberMask = "0000 0000 0000";
    this.showMask = false;

  }

  addPhoneMask(obj: Object) {
    this.PhoneMask = "0000000000";
    this.showMask = false;
  }

  addPinCodeMask(obj: Object) {
    this.PinCodeMask = "000000";
  }

  ngOnInit(): void {
    this.RegistrationForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: [''],
      name: [''],
      mobileNo: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$")]],

      BusinessType: [''],
      Industry: [''],
      businessLicenseType: [''],
      GSTNo: [''],
      PANNo: [''],
      AadharCard: [''],
      BusinessName: [''],
      BusinessPhone: [''],
      Address1: [''],
      Address2: [''],
      pinCode: [''],
      city: [''],
      state: [''],
      mobileotp: [''],
      IsPersonal: [false],

    });

  }

  onChangePersonal(type: number) {
    this.isPersonal = type == 1;
    const businessType = this.RegistrationForm.get('BusinessType');
    const businessLicenseType = this.RegistrationForm.get('businessLicenseType');
    const Industry = this.RegistrationForm.get('Industry');

    const businessName = this.RegistrationForm.get('BusinessName');
    const businessPhone = this.RegistrationForm.get('BusinessPhone');

    const gstNo = this.RegistrationForm.get('GSTNo');
    const panNo = this.RegistrationForm.get('PANNo');
    const AadharCard = this.RegistrationForm.get('AadharCard');

    if (type == 1) {
      businessType.clearValidators();
      businessLicenseType.clearValidators();
      Industry.clearValidators()
      businessName.clearValidators();
      businessPhone.clearValidators();
      gstNo.clearValidators();
      panNo.clearValidators();
      AadharCard.clearValidators();
    }
    else {
      businessType.setValidators([Validators.required]);
      businessLicenseType.setValidators([Validators.required]);
      Industry.setValidators([Validators.required]);
      businessName.setValidators([Validators.required]);
      businessPhone.setValidators([Validators.required]);
      gstNo.setValidators([Validators.required]);
      panNo.setValidators([Validators.required]);
      AadharCard.setValidators([Validators.required]);
    }

    businessType.updateValueAndValidity();
    businessLicenseType.updateValueAndValidity();
    Industry.updateValueAndValidity();
    businessName.updateValueAndValidity();
    businessPhone.updateValueAndValidity();
    gstNo.updateValueAndValidity();
    panNo.updateValueAndValidity();
    AadharCard.updateValueAndValidity();
  }

  Change() {
    this.mobileOTP = false
  }

  ChangeLicenseType() {

    debugger;

    const gstNo = this.RegistrationForm.get('GSTNo');
    const panNo = this.RegistrationForm.get('PANNo');
    const AadharCard = this.RegistrationForm.get('AadharCard');

    gstNo.reset();
    panNo.reset();
    AadharCard.reset();
  }

  keydownEvent(event) {
    debugger
    if (this.mobileOTP) {

      event.preventDefault();
      event.stopPropagation();

      return false;

    }

  }

  keytab(event) {
    debugger
    if (this.mobileverified)
      event.preventDefault();

    const input = event.target;
    const length = input.value.length;

    if (length >= 11) {
      let element = event.srcElement.nextElementSibling; // get the sibling element

      if (element == null)  // check if its null
        return;
      else
        element.focus();   // focus if not null
    }
  }

  keytabVerify(event) {
    debugger
    const input = event.target;
    const length = input.value.length;

    if (length >= 5) {
      let element = event.srcElement.nextElementSibling; // get the sibling element

      if (element == null)  // check if its null
        return;
      else
        element.focus();   // focus if not null
    }
  }

  get f() { return this.RegistrationForm.controls; }

  formControlValueChanged() {

    const businessLicenseType = this.RegistrationForm.get('businessLicenseType');
    const gstNo = this.RegistrationForm.get('GSTNo');
    const panNo = this.RegistrationForm.get('PANNo');
    const AadharCard = this.RegistrationForm.get('AadharCard');


    if (businessLicenseType.value == 'GSTIN') {
      gstNo.setValidators([Validators.required]);

      panNo.clearValidators();
      AadharCard.clearValidators();

      gstNo.updateValueAndValidity();
      panNo.updateValueAndValidity();
      AadharCard.updateValueAndValidity();
    }
    else if (businessLicenseType.value == 'BusinessPAN') {

      panNo.setValidators([Validators.required]);

      gstNo.clearValidators();
      AadharCard.clearValidators();

      gstNo.updateValueAndValidity();
      panNo.updateValueAndValidity();
      AadharCard.updateValueAndValidity();
    }
    else if (businessLicenseType.value == 'AadharCard') {

      AadharCard.setValidators([Validators.required]);

      panNo.clearValidators();
      gstNo.clearValidators();

      AadharCard.updateValueAndValidity();
      gstNo.updateValueAndValidity();
      panNo.updateValueAndValidity();
    }
  }

  //*****************************Validate mobile && call checkMobileAlreadyExist function************/
  validateAndCheckMobile() {
    this.submitted = true;
    if (this.f.mobileNo.errors) {

      if (this.f.mobileNo.errors.required) {
        this.presentToast('Please, Enter 10 digit Mobile Number.');
        return;
      } else {
        this.presentToast('Please, Enter 10 digit Mobile Number.');
        return;
      }
    } else {
      this.submitted = false;
      this.checkMobileAlreadyExist();
    }
  }


  //*****************************Check mobile Already Exist in the database or not*********************/

  checkMobileAlreadyExist() {
    ;
    this.loginStart = true;
    let obj = {
      "MobileNo": this.RegistrationForm.get('mobileNo').value
    }

      ;
    this.mobileotpSendStart = true;
    this.userService.CheckMobileAllReadyRegisteredOrNot(obj).subscribe((res: any) => {
      debugger
      this.loginStart = false;
      if (res == 0) {
        this.sendMobileOtp();

      }
      else if (res > 0) {
        this.mobileotpSendStart = false;
        // alert('You are already registered. Please log in.');
        this.presentToast('You are already registered. Please log in.');
        // this.presentToast('You are already registered. Please log in.');
        this.router.navigate(['/tabs/tab1']);

        // const modal = this.modalController.create({
        //   component: SigninComponent
        // });
        // return modal.present();
        // this.modalService.open(SigninComponent, {
        //   size: 'lg',
        //   //ariaLabelledBy: 'Cart-Modal',
        //   centered: true,
        //   //windowClass: 'theme-modal cart-modal CartModal'
        // }).result.then((result) => {
        //   `Result ${result}`
        // }, (reason) => {
        //   this.modalService.dismissAll();
        // });

      }
      else {
        // this.presentToast('OTP sending to this number is denied. Contact customer care at alibabachair.Com');
        this.presentToast('OTP sending to this number is denied. Contact customer care at alibabachair.Com');
      }
    }, error => {
      this.mobileotpSendStart = false;
      // this.toastr.error(error);
    });
  }




  //*****************************send mobile OTP************/
  sendMobileOtp() {
    debugger;
    const mobileotp = this.RegistrationForm.get('mobileotp');
    mobileotp.setValue('');
    mobileotp.updateValueAndValidity();

    // this.toastr.success('OTP has been sent.');
    this.counter = 60;// for OTP time
    this.mobileOTP = true;
    this.Set_Time();
    setTimeout(() => {
      this.setFocus();
    }, 500);
  }


  hideShowPassword(): void {

    if (this.inputType == 'password') {
      this.inputType = 'text';
      this.class = 'fa fa-eye-slash';
    }
    else {
      this.inputType = 'password';
      this.class = 'fa fa-eye';
    }

  }
  /*****************************verify mobile OTP*********************/
  verifyMobileOtp(): boolean {

    debugger;

    if (this.RegistrationForm.get('mobileotp').value == '') {
      this.presentToast('mobile otp required');
      //$('#txtverify').focus();
      this.setFocus();
      return false;
    }
    else {

      this.mobilecode = this.RegistrationForm.get('mobileotp').value
      if (this.mobilecode.length < 5) {
        this.presentToast('please enter 6 digit OTP');
        // $('#txtverify').focus();
        this.setFocus();
        return false;
      }
      //this.spinner.show();
      this.VerifyStart = true;

      let d = {
        "MobileNo": this.RegistrationForm.get('mobileNo').value,
        "OTP": this.mobilecode.replace(/\s/g, "")

      }


      this.userService.verify_mobile_otp(d).subscribe((res: any) => {
        //setTimeout(() => this.spinner.hide(), 200);
        this.VerifyStart = false;
        if (res == 1) {
          this.mobileverified = true;
          //this.validate = true;
          //this.mobileOTP = false;
          this.mvaldate = false;
          return true;
        } else if (res == 0) {
          this.presentToast('Invalid OTP');
          return false;

        } else if (res == 2) {

          this.presentToast('Invalid OTP');
          return false;
        } else {
          this.presentToast('Exception Error');
          return false;
        }
        return true;

      }, (err) => {
        this.presentToast(err.error);
        return false;
      });
    }


  }

  //****************************** Create Registration into database*************//
  CreateRegistration() {
    debugger
    this.verifyMOtp = this.verifyMobileOtp();

    if (this.verifyMOtp == false)
      return;
    debugger
    this.submitted = true;


    if (this.RegistrationForm.invalid) {
     
      if ($('#password').val() == '') {
        $('#password').focus();
        return;
      }

    }
    else {
      debugger

      this.userService.UserRegistration(this.RegistrationForm.value).subscribe(res => {
        debugger
        if (res <= 0) {
          // setTimeout(() => this.spinner.hide(), 500);
          this.presentToast("Something went wrong. please try again");
        }
        else if (res > 1) {
          // setTimeout(() => this.spinner.hide(), 500);
          debugger
         
          let obj = {
            LoginId: this.RegistrationForm.value.mobileNo,
            password: this.RegistrationForm.value.password,
            userType: 2
          };
          this.userService.ValidLogin(obj).subscribe(res => {
            if (res.length > 0) {
              if (res[0].statusId == 2) {
                localStorage.setItem('LoggedInUser', JSON.stringify(res));
                localStorage.setItem('Token', res[0].token);
                this._SharedDataService.AssignUser(res);
                this._SharedDataService.UserCart(res);

                this.presentToast("Thank you for registering with us. You should receive a confirmation text message(SMS) shortly with your user name and password reminder.");
                
                this.router.navigate(['/tabs/tab1']);
               
              }
            }
          });
          
        }
        else {
          // setTimeout(() => this.spinner.hide(), 500);
          this.presentToast("You are already registered. Please log in.");
          // this.modalService.open(SigninComponent, {
          //   size: 'lg',
          //   //ariaLabelledBy: 'Cart-Modal',
          //   centered: true,
          //   //windowClass: 'theme-modal cart-modal CartModal'
          // }).result.then((result) => {
          //   `Result ${result}`
          // }, (reason) => {
          //   this.modalService.dismissAll();
          // });
          return;
        }
      });
    }
  }

  //******************************Show Resend OTP in*************//
  Set_Time() {

    if (this.counter != 0) {
      this.counter--;

    }
    else {
      clearTimeout();
    }

    setTimeout(() => {

      if (this.counter > 0) {
        this.Set_Time();
      }
      if (this.counter == 0) {
        this.mobileOTP = false;

      }

    }, 1000);

  }

  Login() {
    // this.modalService.open(SigninComponent, {
    //   size: 'lg',
    //   ariaLabelledBy: 'Cart-Modal',
    //   centered: true,
    //   windowClass: 'theme-modal cart-modal CartModal'
    // });
    this.router.navigate(['/signin']);
  }

}