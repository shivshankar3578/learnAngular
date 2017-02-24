import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { Zone } from './zones.model';

@Injectable()
export class ZoneService {
  zones: Observable<Zone[]>;
  private _zones: BehaviorSubject<Zone[]>;
  private baseUrl: string;
  private dataStore: {
    zones: Zone[]
  };
  zone : Zone;

  constructor(private http: Http) {
    this.baseUrl = 'http://localhost:1338';
    this.dataStore = { zones: [] };
    this._zones = <BehaviorSubject<Zone[]>>new BehaviorSubject([]);
    this.zones = this._zones.asObservable();
  }

  loadAll() {
    this.http.get(`${this.baseUrl}/zones`).map(response => response.json()).subscribe(data => {
      this.dataStore.zones = data.items;
      this._zones.next(Object.assign({}, this.dataStore).zones);
    }, error => console.log('Could not load zones.'));
  }

  load(id: number | string) {
    this.http.get(`${this.baseUrl}/zones/${id}`).map(response => response.json()).subscribe(data => {
      let notFound = true;

      this.dataStore.zones.forEach((item, index) => {
        if (item.id === data.id) {
          this.dataStore.zones[index] = data;
          notFound = false;
        }
      });

      if (notFound) {
        this.dataStore.zones.push(data);
      }

      this._zones.next(Object.assign({}, this.dataStore).zones);
    }, error => console.log('Could not load zone.'));
  }

  create(zone: Zone) {
    this.http.post(`${this.baseUrl}/zones`, JSON.stringify(zone))
      .map(response => response.json()).subscribe(data => {
        this.dataStore.zones.push(data);
        this._zones.next(Object.assign({}, this.dataStore).zones);
      }, error => console.log('Could not create zone.'));
  }

  update(zone: Zone) {
    this.http.put(`${this.baseUrl}/zones/${zone.id}`, JSON.stringify(zone))
      .map(response => response.json()).subscribe(data => {
        this.dataStore.zones.forEach((t, i) => {
          if (t.id === data.id) { this.dataStore.zones[i] = data; }
        });

        this._zones.next(Object.assign({}, this.dataStore).zones);
      }, error => console.log('Could not update zone.'));
  }

  remove(zoneId: number) {
    this.http.delete(`${this.baseUrl}/zones/${zoneId}`).subscribe(response => {
      this.dataStore.zones.forEach((t, i) => {
        if (t.id === zoneId) { this.dataStore.zones.splice(i, 1); }
      });

      this._zones.next(Object.assign({}, this.dataStore).zones);
    }, error => console.log('Could not delete zone.'));
  }
  setSingleZone(zone: Zone) {
    this.zone = Object.assign({}, zone);
  }
  removeSingleZone() {
    this.zone = Object.assign({}, new Zone('','',this.guid(),'',''));
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