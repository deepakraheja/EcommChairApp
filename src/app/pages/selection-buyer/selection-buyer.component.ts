import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SigninComponent } from '../auth/signin/signin.component';

@Component({
  selector: 'app-selection-buyer',
  templateUrl: './selection-buyer.component.html',
  styleUrls: ['./selection-buyer.component.scss'],
})
export class SelectionBuyerComponent implements OnInit {

  IsBulkBuyer: boolean = false;
  submitted: boolean = false;
  //modalRef: BsModalRef;
  isSelected: false;
  constructor(
    private router: Router,
    private modalController: ModalController,
    //  private modalService: NgbModal,
    //public modalService: BsModalService,
    //private NgmodalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  fnSubmit(type: string) {

    localStorage.setItem('Bbuyer', type);
    this.router.navigate(['/signup']);
    //this.modalService.hide();
    //this.NgmodalService.dismissAll();

  }

  onChangePersonal(type: boolean) {
    debugger;
    this.IsBulkBuyer=type;
    if (type == false) {
      localStorage.setItem('Bbuyer', "false");
      this.router.navigate(['/signup']);
      //this.NgmodalService.dismissAll();
    }
    // else {
    //   //this.modalRef = this.modalService.show(template);
    // }

  }

  close() {

    debugger
    this.isSelected = false;
    this.IsBulkBuyer=false;
    //this.modalService.hide();
  }

  async Login() {
    //this.user = JSON.parse(localStorage.getItem('LoggedInUser'));
    // //  
    //if (this.user == null || this.user == undefined) {
      const modal = await this.modalController.create({
        component: SigninComponent
      });
      return await modal.present();
    //}
    //this.router.navigate(['pages/userlogin']);
    //this.NgmodalService.dismissAll();
  }


}
