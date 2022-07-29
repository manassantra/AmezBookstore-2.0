import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  user: any;
  title = 'Admin Panel';

  ngOnInit(): void {
    let usr = localStorage.getItem('admin');
      if (usr) {
         this.user = usr ;
      }
  }
}
