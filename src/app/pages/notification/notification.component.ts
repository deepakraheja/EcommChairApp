/**
 * Notification Screen
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   ThemesBuckets
 */

import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  notifications: any = [];

  constructor(private notificationsService: NotificationsService,
    private router: Router) { }

  ngOnInit() {
    this.getNotification();
  }

  // Get list of notification
  getNotification() {
    this.notifications = this.notificationsService.getNotifications();
  }

  // Go to cart page
  async gotoCartPage() {
    this.router.navigate(['/cart']);
  }
}
