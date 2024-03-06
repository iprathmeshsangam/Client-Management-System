import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddMeetingComponent } from '../add-meeting/add-meeting.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrl: './meeting-list.component.css',
})
export class MeetingListComponent implements OnInit {
  //declaring Data Source
  Today = new Date()

  displayedColumns: string[] = [
    'id',
    'MeetingWith',
    'MeetingAgenda',
    'MeetingAttendees',
    'MeetingDate',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private getMeetingApi: ApiService,
    private meetingDialogRef: MatDialog
  ) {}

  //function calling
  ngOnInit(): void {
    this.getAllMeetings();
  }

  //get all Meeting Data from the Api Call
  getAllMeetings() {
    this.getMeetingApi.getMeeting().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        alert('Error while fetching the Records');
      },
    });
  }

  //Apply filter

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //Edit Meeting
  editMeeting(row: any) {
    this.meetingDialogRef
      .open(AddMeetingComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Update') {
          this.getAllMeetings();
        }
      });
  }

  //delete Meeting
  DeleteMeet(id:any){
    this.getMeetingApi.deleteMeeting(id).subscribe({
        next:(res)=>{
          alert("Deleted meeting successfully!");
          this.getAllMeetings();
        },
        error:()=>{
          alert("Error Deleting the Meeting");
        }
    });
  }
  //end
}
