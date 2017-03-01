import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Room } from './rooms.model';
import { RoomService } from './rooms.service';
// other module dependency
import { ZoneService } from '../zones/zones.service';
import { Zone } from '../zones/zones.model';

@Component({
	selector: 'app-rooms-create',
	templateUrl: './rooms-create.component.html',
	styleUrls: ['./rooms-create.component.css']
})
export class RoomsCreateComponent implements OnInit {
	public roomForm: FormGroup;
	public isEdit: boolean;
	private room: Room;
	private selectedZone:  Zone;
	zones: Observable<Zone[]>;
	constructor(
		private formBuilder: FormBuilder,
		private roomService: RoomService,
		private zoneService: ZoneService,
		public dialogRef: MdDialogRef<RoomsCreateComponent>
		) {
			this.isEdit = false;
		}

	ngOnInit() {
		// load all the zones
		this.zones = this.zoneService.zones;
    	this.zoneService.loadAll();
		this.room = this.roomService.room;
		if(this.room.id){
			this.isEdit = true;
			this.selectedZone = this.room.zone;
			this.loadForm();
		}else{
			this.isEdit = false;
			this.loadForm();
		}
	}

	loadForm(){
		console.log("loadform called", this.room)
		this.roomForm = new FormGroup({
			zone: new FormControl((this.room.zone)?this.room.zone:'', [<any>Validators.required]),
			name: new FormControl(this.room.name, [<any>Validators.required, <any>Validators.minLength(5)]),
			type: new FormControl(this.room.type, [<any>Validators.required]),
			maxUsers: new FormControl( this.room.maxUsers, [<any>Validators.required]),
		});
	}
	onSubmit(model: Room, isValid: boolean) {
		if(!this.isEdit){
			model.zone = this.selectedZone;
			this.roomService.create(model);
		}else{
			const room = Object.assign(this.room, model);
			room.zone = this.selectedZone;
			this.roomService.update(room);
		}
		return this.dialogRef.close('success');
	}
	blurZoneInput(zone){
		zone.focused;
		console.log(zone);
	}

	selectZone(zoneEle: any, zone: Zone){
		zoneEle.value = zone.name + ' <'+ zone.key + '>'
		this.selectedZone = zone;
	}

}
