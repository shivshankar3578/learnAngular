import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { RoomsCreateComponent } from './rooms-create.component';
import { Observable } from 'rxjs/Observable';
import { Room } from './rooms.model';
import { RoomService } from './rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})

export class RoomsComponent implements OnInit {
  rooms: Observable<Room[]>;
	dialogRef: MdDialogRef<RoomsCreateComponent>;
  
  constructor(
    private roomService: RoomService,
    public dialog: MdDialog,
    public viewContainerRef: ViewContainerRef
    ) {}
  
  ngOnInit() {
    this.rooms = this.roomService.rooms;
    
    this.roomService.loadAll();
  }
  

  
  deleteRoom(roomId: number) {
    this.roomService.remove(roomId);
  }
  
  openDialog() {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
    this.roomService.removeSingleRoom();
    this.dialogRef = this.dialog.open(RoomsCreateComponent, config);

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }
  openDialogEdit(room:Room) {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
    this.dialogRef = this.dialog.open(RoomsCreateComponent, config);
    this.roomService.setSingleRoom(room);
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }
  

}
