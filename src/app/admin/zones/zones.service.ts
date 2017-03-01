import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
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
  createAuthorizationHeader(headers: Headers) {
     headers.append('Authorization', `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiaXNzdWVkIjoiMjAxNy0wMi0yMlQxMjo1OTowOFoifQ.5VpQYkEECi4HWzT-VJVDQ_63XPH2RPP1DHDCDHjW8JI`);
  }
  zone : Zone;

  constructor(private http: Http) {
    this.baseUrl = 'http://192.168.2.37:3000';
    this.dataStore = { zones: [] };
    this._zones = <BehaviorSubject<Zone[]>>new BehaviorSubject([]);
    this.zones = this._zones.asObservable();
  }

  loadAll() {
     let headers = new Headers();
     this.createAuthorizationHeader(headers);
    //this.http.get(window.location.pathname+'/zones.json').map(response => response.json())
    this.http.get(`${this.baseUrl}/zones`, {headers: headers}).map(response => response.json())
    .subscribe(data => {
      this.dataStore.zones = data;
      this._zones.next(Object.assign({}, this.dataStore).zones);
   }, error => console.log('Could not load zones.', error));
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
   //   console.log("zone create called", zone)
     let headers = new Headers();
     this.createAuthorizationHeader(headers);
     headers.append("Content-Type", 'application/json');
    this.http.post(`${this.baseUrl}/zones`, JSON.stringify(zone), {headers: headers})
      .map(response => response.json()).subscribe(data => {
        this.dataStore.zones.push(data);
        console.log('res', data);
        this._zones.next(Object.assign({}, this.dataStore).zones);
     }, error => console.log('Could not create zone.', error));
  }

  update(zone: Zone) {
     console.log("zone update called", zone)
     let headers = new Headers();
     this.createAuthorizationHeader(headers);
     headers.append("Content-Type", 'application/json');
    this.http.put(`${this.baseUrl}/zones/${zone.id}`,  JSON.stringify(zone),{headers: headers})
      .map(response => response.json()).subscribe(data => {
         console.log('update res', data)
        this.dataStore.zones.forEach((t, i) => {
          if (t.id === data.id) { this.dataStore.zones[i] = data; }
        });

        this._zones.next(Object.assign({}, this.dataStore).zones);
     }, error => console.log('Could not update zone.', error));
  }

  remove(zoneId: number) {
     console.log("zone remove called", zoneId)
     let headers = new Headers();
     this.createAuthorizationHeader(headers);
    this.http.delete(`${this.baseUrl}/zones/${zoneId}`,{headers: headers}).subscribe(response => {
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
