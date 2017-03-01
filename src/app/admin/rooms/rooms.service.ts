import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { Room } from './rooms.model';

@Injectable()
export class RoomService {
  rooms: Observable<Room[]>;
  private _rooms: BehaviorSubject<Room[]>;
  private baseUrl: string;
  private dataStore: {
    rooms: Room[],
    zone: {}
  };
  createAuthorizationHeader(headers: Headers) {
     headers.append('Authorization', `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiaXNzdWVkIjoiMjAxNy0wMi0yMlQxMjo1OTowOFoifQ.5VpQYkEECi4HWzT-VJVDQ_63XPH2RPP1DHDCDHjW8JI`);
  }
  room : Room;
  constructor(private http: Http) {
    this.baseUrl = 'http://192.168.2.37:3000';
    this.dataStore = { rooms: [], zone:{} };
    this._rooms = <BehaviorSubject<Room[]>>new BehaviorSubject([]);
    this.rooms = this._rooms.asObservable();
  }


  loadAll(zoneId) {
     console.log("loadAll called",zoneId)
     let headers = new Headers();
     this.createAuthorizationHeader(headers);
    this.http.get(`${this.baseUrl}/zones/${zoneId}`,{headers: headers}).map(response => response.json())
    //this.http.get('rooms.json').map(response => response.json())
    .subscribe(data => {
      this.dataStore.rooms = data.rooms;
      delete(data.rooms)
      this.dataStore.zone = data;
      this._rooms.next(Object.assign({}, this.dataStore).rooms);
   }, error => console.log('Could not load rooms.', error));
  }

  load(id: number | string) {
     console.log("load called",id)
     let headers = new Headers();
     this.createAuthorizationHeader(headers);
    this.http.get(`${this.baseUrl}/rooms/${id}`, {headers: headers}).map(response => response.json()).subscribe(data => {
      let notFound = true;

      this.dataStore.rooms.forEach((item, index) => {
        if (item.id === data.id) {
          this.dataStore.rooms[index] = data;
          notFound = false;
        }
      });

      if (notFound) {
        this.dataStore.rooms.push(data);
      }

      this._rooms.next(Object.assign({}, this.dataStore).rooms);
    }, error => console.log('Could not load room.'));
  }

  create(room: Room) {
     console.log("create called",room)
     let headers = new Headers();
     this.createAuthorizationHeader(headers);
      headers.append("Content-Type", 'application/json');
    this.http.post(`${this.baseUrl}/rooms`, JSON.stringify(room), {headers: headers})
      .map(response => response.json()).subscribe(data => {
        this.load(data.id);
        this.dataStore.rooms.push(data);
        this._rooms.next(Object.assign({}, this.dataStore).rooms);
     }, error => console.log('Could not create room.', error));
  }

  update(room: Room) {
     console.log("update called",room)
     let headers = new Headers();
     this.createAuthorizationHeader(headers);
      headers.append("Content-Type", 'application/json');
    this.http.put(`${this.baseUrl}/rooms/${room.id}`, JSON.stringify(room),{headers: headers})
      .map(response => response.json()).subscribe(data => {
        this.dataStore.rooms.forEach((t, i) => {
          if (t.id === data.id) { this.dataStore.rooms[i] = data; }
        });

        this._rooms.next(Object.assign({}, this.dataStore).rooms);
     }, error => console.log('Could not update room.', error));
  }

  remove(roomId: number) {
     console.log("remove called",roomId)
     let headers = new Headers();
     this.createAuthorizationHeader(headers);
    this.http.delete(`${this.baseUrl}/rooms/${roomId}`,{headers: headers}).subscribe(response => {
      this.dataStore.rooms.forEach((t, i) => {
        if (t.id === roomId) { this.dataStore.rooms.splice(i, 1); }
      });

      this._rooms.next(Object.assign({}, this.dataStore).rooms);
   }, error => console.log('Could not delete room.', error));
  }
  setSingleRoom(room: Room) {
    this.room = Object.assign({}, room);
  }
  removeSingleRoom() {
    this.room = Object.assign({}, new Room('',null,'','','',''));
  }

  private guid = function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }
    return s4() + s4() + '-' + s4() +  s4() + '-' +
    s4() + s4();
  }
}
