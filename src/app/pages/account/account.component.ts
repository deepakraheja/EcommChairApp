import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/Service/shared-data.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  public LoggedInUser: any[] = [];
  constructor(
    private _SharedDataService: SharedDataService,
  ) { }

  ngOnInit() {
    this._SharedDataService.currentUser.subscribe(a => {
      this.LoggedInUser = a;
    });
  }

}
