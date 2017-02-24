import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
	list:Array<any>;
  constructor() { 
  	this.list =[1,2,3,4,5,6,7,8,9,10];
  }

  ngOnInit() {
  }

}
