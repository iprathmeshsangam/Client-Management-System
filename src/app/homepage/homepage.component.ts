import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  Today = new Date();
  userName : string = "Prathmesh Sangam";

  ngOnInit(): void {
    
  }

}
