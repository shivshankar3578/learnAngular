import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Zone } from './zones.model';
import { ZoneService } from './zones.service';

@Component({
	selector: 'app-zones-create',
	templateUrl: './zones-create.component.html',
	styleUrls: ['./zones-create.component.css']
})
export class ZonesCreateComponent implements OnInit {
	public zoneForm: FormGroup; 
	public isEdit: boolean;
	private zone: Zone;
	constructor(
		private formBuilder: FormBuilder,
		private zoneService: ZoneService,
		public dialogRef: MdDialogRef<ZonesCreateComponent>
		) {
			this.isEdit = false;
		}

	ngOnInit() {
		this.zone = this.zoneService.zone;
		if(this.zone.id){
			this.isEdit = true;
			this.loadForm();
		}else{
			this.isEdit = false;
			this.loadForm();
		}
	}
	loadForm(){
		this.zoneForm = new FormGroup({
			name: new FormControl(this.zone.name, [<any>Validators.required, <any>Validators.minLength(5)]),
			key: new FormControl( this.zone.key, [<any>Validators.required]),
		});
	}
	onSubmit(model: Zone, isValid: boolean) {
		if(!this.isEdit){
			this.zoneService.create(model);
		}else{
			this.zoneService.update(Object.assign(this.zone, model));
		}
		return this.dialogRef.close('success');
	}

}
