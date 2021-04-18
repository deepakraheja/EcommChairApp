import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { UsersService } from 'src/app/Service/users.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  LoginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private modalController: ModalController,
    public toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.LoginForm = this.formBuilder.group({
      LoginId: ['', Validators.required],
      password: ['', Validators.required],
      userType: 2
    });
  }
  get f() { return this.LoginForm.controls; }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }

  Login() {
    debugger
    // this.submitted = true;
    if (this.LoginForm.invalid) {
      // this.toastr.error('All the * marked fields are mandatory');
      return;
    }
    else {
      //this.spinner.show();

      // this.loginStart = true;
      this.userService.ValidLogin(this.LoginForm.value).subscribe(res => {
        // this.loginStart = false;
        //setTimeout(() => this.spinner.hide(), 500);
        if (res.length > 0) {
          if (res[0].isAgent == 1) {
            // this.toastr.error('You are an agent.');
            return;
          }
          if (res[0].statusId == 1) {
            // this.toastr.error('Your login is pending. Please wait for approval.');
            return;
          }
          else if (res[0].statusId == 3) {
            // this.toastr.error('Your login approval is denied.');
            return;
          }
          else if (res[0].statusId == 4) {
            // this.toastr.error('Your account has been put on hold.');
            return;
          }
          else if (res[0].statusId == 2) {
            localStorage.setItem('LoggedInUser', JSON.stringify(res));
            localStorage.setItem('Token', res[0].token);

            // this._SharedDataService.AssignUser(res);
            // this._SharedDataService.UserCart(res);

            this.dismiss();
            //this.toastr.error('You approval is pending.');
          }
        }
        else {
          // this.toastr.error('Your username or password is incorrect');
          return;
        }
      });
    }
  }

  SignUp(){
    this.dismiss();
    this.router.navigate(['/signup']);
  }
}
