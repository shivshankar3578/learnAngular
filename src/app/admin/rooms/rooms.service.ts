import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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
    rooms: Room[]
  };
  room : Room;

  constructor(private http: Http) {
    this.baseUrl = 'http://localhost:1338';
    this.dataStore = { rooms: [] };
    this._rooms = <BehaviorSubject<Room[]>>new BehaviorSubject([]);
    this.rooms = this._rooms.asObservable();
  }

  loadAll() {
    this.http.get(`${this.baseUrl}/rooms`).map(response => response.json()).subscribe(data => {
      this.dataStore.rooms = data.items;
      this._rooms.next(Object.assign({}, this.dataStore).rooms);
    }, error => console.log('Could not load rooms.'));
  }

  load(id: number | string) {
    this.http.get(`${this.baseUrl}/rooms/${id}`).map(response => response.json()).subscribe(data => {
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
    this.http.post(`${this.baseUrl}/rooms`, JSON.stringify(room))
      .map(response => response.json()).subscribe(data => {
        this.load(data.id);
        // this.dataStore.rooms.push(data);
        // this._rooms.next(Object.assign({}, this.dataStore).rooms);
      }, error => console.log('Could not create room.'));
  }

  update(room: Room) {
    this.http.put(`${this.baseUrl}/rooms/${room.id}`, JSON.stringify(room))
      .map(response => response.json()).subscribe(data => {
        this.dataStore.rooms.forEach((t, i) => {
          if (t.id === data.id) { this.dataStore.rooms[i] = data; }
        });

        this._rooms.next(Object.assign({}, this.dataStore).rooms);
      }, error => console.log('Could not update room.'));
  }

  remove(roomId: number) {
    this.http.delete(`${this.baseUrl}/rooms/${roomId}`).subscribe(response => {
      this.dataStore.rooms.forEach((t, i) => {
        if (t.id === roomId) { this.dataStore.rooms.splice(i, 1); }
      });

      this._rooms.next(Object.assign({}, this.dataStore).rooms);
    }, error => console.log('Could not delete room.'));
  }
  setSingleRoom(room: Room) {
    this.room = Object.assign({}, room);
  }
  removeSingleRoom() {
    this.room = Object.assign({}, new Room('','','','','',''));
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