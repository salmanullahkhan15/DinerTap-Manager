import { MorePopoverPage } from './../more-popover/more-popover';
import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { OrderDetailPage } from '../order-detail/order-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  segment: any = "new";
  ordersArray: any = [];
  orderArrayShow: any = [];
  constructor(public navCtrl: NavController,
    public popoverCtrl: PopoverController) {

  }

  ionViewWillEnter() {
    for (let i = 0; i < 8; i++) {
      var data = {
        name: "Order No. " + i,
        img: (i / 2) % 1 ? "assets/imgs/bag.png" : "assets/imgs/delivery.png",
        description: "Lorem Ipsum is simply dummy text of the printing",
        type: (i / 2) % 1 ? "takeaway" : "delivery",
        amount: 500

      }
      this.orderArrayShow.push(data)

      this.ordersArray = this.orderArrayShow
    }
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(MorePopoverPage);
    popover.onDidDismiss(data => {
      if (data != undefined && data != null) {
        this.ordersArray = [];
        for (let i = 0; i < this.orderArrayShow.length; i++) {
          if (data.num == 1 && this.orderArrayShow[i].type == "takeaway") {
            this.ordersArray.push(this.orderArrayShow[i])
          } else if (data.num == 2 && this.orderArrayShow[i].type == "delivery") {
            this.ordersArray.push(this.orderArrayShow[i])
          } else if (data.num == 0) {
            this.ordersArray.push(this.orderArrayShow[i])
          }
        }
      }

    })
    popover.present({
      ev: myEvent
    });
  }

  gotoOrderDetail() {
    this.navCtrl.push(OrderDetailPage)
  }

}
