import { Component, OnInit } from '@angular/core';
import { MdSidenav } from '@angular/material';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  providers:[MdSidenav]
})
export class SideBarComponent implements OnInit {

  constructor(public mdSidenav : MdSidenav) { }

  setLeftSideBar(left) {
  	console.log(left);
  }
  
  ngOnInit() {
  }

}
