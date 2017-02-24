import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersEditComponent implements OnInit {

  constructor(public router: Router) {}
  save () {
  	this.router.navigate(['admin','users','list']);
  }
  ngOnInit() {
  }

}
