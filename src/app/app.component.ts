
/**
 * Main App Components
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   ThemesBuckets
 * 
 */

import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PagesService } from './services/pages.service';
import { SharedDataService } from './Service/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public appPages = [];
  public LoggedInUser: any[] = [];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuController: MenuController,
    private router: Router,
    private pagesService: PagesService,
    private _SharedDataService: SharedDataService,
  ) {

    
  }

  ngOnInit(): void {
    // this._SharedDataService.currentUser.subscribe(a => {
    //   this.LoggedInUser = a;
    // });
    this.initializeApp();
  }


  initializeApp() {
    this._SharedDataService.currentUser.subscribe(a => {
      this.LoggedInUser = a;
      this.LoggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'));
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();

        // Get Menus For Side Menu
        this.appPages = this.pagesService.getPages();
      });
    });

  }

  // Signout Button
  signout() {
    localStorage.removeItem('LoggedInUser');
    localStorage.removeItem('Token');
    this.LoggedInUser = [];
    this._SharedDataService.AssignUser(null);
    this._SharedDataService.UserCart(null);
    this.router.navigate(['/tabs/SelectionBuyer']);
    // this.router.navigate(['/onbroading']);
    // this.menuController.enable(false); // Make Sidemenu disable
  }
}
