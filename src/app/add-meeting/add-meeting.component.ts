import { Component, Inject, OnInit, inject, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeetingListComponent } from '../meeting-list/meeting-list.component';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrl: './add-meeting.component.css',
})
export class AddMeetingComponent implements OnInit {
  //form Group to handle form
  meetingForm!: FormGroup;
  actionBtn: string = 'Save';

  @ViewChild(MeetingListComponent) child!: MeetingListComponent;
  
  constructor(
    private formBuilder: FormBuilder,
    private meetingApi: ApiService,
    @Inject(MAT_DIALOG_DATA) public editMeetingData: any, // inject Data from row to form Field
    private MeetingDialogRef: MatDialogRef<AddMeetingComponent>
  ) {}

  ngOnInit(): void {
    this.meetingForm = this.formBuilder.group({
      MeetingWith: ['', Validators.required],
      MeetingAgenda: ['', Validators.required],
      MeetingAttendees: ['', Validators.required],
      MeetingDate: ['', Validators.required],
    });

    console.log(this.editMeetingData);
    if (this.editMeetingData) {
      this.actionBtn = 'Update';
      this.meetingForm.controls['MeetingWith'].setValue(
        this.editMeetingData.MeetingWith
      );
      this.meetingForm.controls['MeetingAgenda'].setValue(
        this.editMeetingData.MeetingAgenda
      );
      this.meetingForm.controls['MeetingAttendees'].setValue(
        this.editMeetingData.MeetingAttendees
      );
      this.meetingForm.controls['MeetingDate'].setValue(
        this.editMeetingData.MeetingDate
      );
    }
  }

  //add Meeting Function
  AddMeeting() {
    console.log(this.meetingForm.value);
    if (!this.editMeetingData) {
      if (this.meetingForm.valid) {
        this.meetingApi.postMeeting(this.meetingForm.value).subscribe({
          next: (res) => {
            alert('Meeting Added Successfully');
            this.meetingForm.reset();
            this.MeetingDialogRef.close('Save');
          },
          error: () => {
            alert('Error while adding Meeting');
          },
        });
      }
    } else {
      this.updateMeeting();
      
    }
  }

  updateMeeting(){
    this.meetingApi.putMeeting(this.meetingForm.value,this.editMeetingData.id).subscribe({
      next:(res)=>{
        alert("Meeting updated Successfully");
        this.meetingForm.reset();
        this.MeetingDialogRef.close('Update');
        
      },
      error:()=>{
        alert("Error while updating the Meeting data");
      } 
    })
  }

  clear() {
    this.meetingForm.reset();
  }
}
