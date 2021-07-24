import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { LoadingService } from 'src/app/Service/loading.service';
import { SharedDataService } from 'src/app/Service/shared-data.service';
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
    private router: Router,
    public loading: LoadingService,
    private _SharedDataService: SharedDataService,
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

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  Login() {
    debugger
    // this.submitted = true;
    if (this.LoginForm.invalid) {
      this.presentToast('All the * marked fields are mandatory');
      return;
    }
    else {
      this.loading.present();

      // this.loginStart = true;
      this.userService.ValidLogin(this.LoginForm.value).subscribe(res => {
        // this.loginStart = false;
        this.loading.dismiss();
        //setTimeout(() => this.spinner.hide(), 500);
        if (res.length > 0) {
          if (res[0].isAgent == 1) {
            this.presentToast('You are an agent.');
            return;
          }
          if (res[0].statusId == 1) {
            this.presentToast('Your login is pending. Please wait for approval.');
            return;
          }
          else if (res[0].statusId == 3) {
            this.presentToast('Your login approval is denied.');
            return;
          }
          else if (res[0].statusId == 4) {
            this.presentToast('Your account has been put on hold.');
            return;
          }
          else if (res[0].statusId == 2) {
            localStorage.setItem('LoggedInUser', JSON.stringify(res));
            localStorage.setItem('Token', res[0].token);

            this._SharedDataService.AssignUser(res);
            this._SharedDataService.UserCart(res);

            this.dismiss();
            this.router.navigate(['tabs/tab1']);
            // this.presentToast('You approval is pending.');
          }
        }
        else {
          this.presentToast('Your username or password is incorrect');
          return;
        }
      });
    }
  }

  SignUp() {
    this.dismiss();
    this.router.navigate(['/signup']);
  }
}
