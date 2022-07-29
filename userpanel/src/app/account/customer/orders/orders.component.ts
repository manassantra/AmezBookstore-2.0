import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { OrderService } from 'src/app/service/order.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  @ViewChild('htmlData') htmlData:ElementRef;

  @Input() data;

  constructor(public orderService: OrderService, public accService: AccountService) { }


  order: any = {};
  orderManager: any = {};
  orderDetails: any = {};
  customerDetails: any ;
  addresDetails: any = {};

  ngOnInit(): void {
    this.order = JSON.parse(localStorage.getItem('order'));
    this.orderDetails = this.order.OrderDetails;
    this.orderManager = this.order;
    this.accService.getProfile().subscribe(res => {
        this.customerDetails = res ;
        this.accService.getShippingAddress().subscribe(res=>{
          this.addresDetails = res;
          console.log(this.addresDetails);
        })
      })
  }

  downloadInvoice() {
    //pdf-generate
    let DATA = document.getElementById('pdf');
        
    html2canvas(DATA).then(canvas => {
        
        let fileWidth = 180;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        const FILEURI = canvas.toDataURL('image/jpeg')
        let PDF = new jsPDF('p', 'mm', 'A4');
        let position = 10;
        PDF.addImage(FILEURI, 'JPEG', 15, position, fileWidth, fileHeight )
        PDF.save('Invoice_'+this.orderManager.PaymentId+'.pdf');
    });     
  }
}
