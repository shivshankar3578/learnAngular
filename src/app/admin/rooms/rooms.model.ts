import { Zone } from '../zones/zones.model';

export class Room {
	constructor(
		public id: number | string,
		public zone:  Zone,
		public name: string,
		public type: string,
		public maxUsers:number | string,
		public createdAt: string,
		public updatedAt: string
		){}
}
