import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SharedDataService } from 'src/app/Service/shared-data.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public LoggedInUser: any[] = [];
  constructor(
    private menuController: MenuController,
    private _SharedDataService: SharedDataService
  ) {
    this.menuController.enable(true); // Enable side menu
    this._SharedDataService.currentUser.subscribe(a => {
      this.LoggedInUser = a;
    });
  }

}
