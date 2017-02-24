import { Zone } from '../zones/zones.model';

export class Room {
	constructor(
		public id: number | string, 
		public zone: number | string | Zone,
		public name: string, 
		public users_limit:number | string,
		public createdAt: string,
		public updatedAt: string
		){}
}