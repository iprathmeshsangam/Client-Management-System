import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  clientCount: number = 0;
  meetingCount: number = 0;
  //for Meeting
  //performing CRUD Operations for Meeting
  //CountClients
  //Create {C}
  postMeeting(data: any) {
    return this.http.post<any>('http://localhost:3000/meetings', data);
  }
  //Read {R}
  getMeeting() {
    return this.http.get<any>('http://localhost:3000/meetings');
  }
  //Update {U}
  putMeeting(data: any, id: any) {
    return this.http.put<any>('http://localhost:3000/meetings/' + id, data);
  }
  //delete {D}
  deleteMeeting(id: any) {
    return this.http.delete<any>('http://localhost:3000/meetings/' + id);
  }

  getMeetingNumbers(){
    return this.http.get<any>("http://localhost:3000/meetings");
  }
  //===============================================

  //For Client
  //performing CRUD Operations for Client
  //Create {C}
  postClient(data: any) {
    return this.http.post<any>('http://localhost:3000/clients', data);
  }

  //Read {R}
  getClient() {
    return this.http.get<any>('http://localhost:3000/clients');
  }

  //Update {U}
  putClient(data: any, id: any) {
    return this.http.put<any>('http://localhost:3000/clients/' + id, data);
  }
  //delete {D}
  deleteClient(id: any) {
    return this.http.delete<any>('http://localhost:3000/clients/' + id);
  }
}
