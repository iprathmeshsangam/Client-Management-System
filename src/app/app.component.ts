import { Component, ViewChild } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';
import { AddClientComponent } from './add-client/add-client.component';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { ClientListComponent } from './client-list/client-list.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = "CMS"
  desc = "Client Management System"
  Today = new Date();

  @ViewChild(MeetingListComponent) MeetingChild!: MeetingListComponent;
  @ViewChild(ClientListComponent) clientChild! : ClientListComponent

  constructor(public dialog: MatDialog) {}


  //this Function will open the Dialog boc to Add Clients 
  openMeetingAdd(){
    this.dialog.open(AddMeetingComponent, {
        width : '30%'
    }).afterClosed().subscribe(val=>{
      if(val ==='Save'){
        this.MeetingChild.getAllMeetings();
      }
    });
  }


  //this function will Open the Dialog box to Add Client Meeting
  openClientAdd() {
    this.dialog.open(AddClientComponent, {
      width : '30%'
    }).afterClosed().subscribe(val=>{
      if(val == 'Register'){
        this.clientChild.getAllClients();
      }
    });
  }

//End
}
