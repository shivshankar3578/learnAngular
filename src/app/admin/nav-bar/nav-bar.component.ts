import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers : []
})
export class NavBarComponent implements OnInit {
	@Output('toggelSideBar') myEvent: EventEmitter<any> = new EventEmitter();
  constructor(public authService: AuthService, public router: Router) { }
  ngOnInit() {
  }

  closeSideBar (evt) {
  	this.myEvent.next(['left']);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
