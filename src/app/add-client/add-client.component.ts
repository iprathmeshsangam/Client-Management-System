import { Component, Inject, OnInit ,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog'
import { ClientListComponent } from '../client-list/client-list.component';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css',
})
export class AddClientComponent implements OnInit {
  ClientForm!: FormGroup;
  actionBtn : string = "Register";
  clientCount :number = 0;

  @ViewChild(ClientListComponent) child! : ClientListComponent;

  
  constructor(
    private clientFormBuilder: FormBuilder,
    private ClientApi : ApiService , 
    @Inject(MAT_DIALOG_DATA) public editClientData : any,
    private clientDialogRef : MatDialogRef<AddClientComponent>) {}

  ngOnInit(): void {
    this.ClientForm = this.clientFormBuilder.group({
      FirstName: ['', Validators.required ],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      Address: ['', Validators.required],
    });

    console.log(this.editClientData);
    if(this.editClientData){
      this.actionBtn = "Update";

      //Edit First Name
      this.ClientForm.controls['FirstName'].setValue(this.editClientData.FirstName);

      //Edit Last Name
      this.ClientForm.controls['LastName'].setValue(this.editClientData.LastName)

      //Edit Email
      this.ClientForm.controls['Email'].setValue(this.editClientData.Email)

      //Edit Address
      this.ClientForm.controls['Address'].setValue(this.editClientData.Address);
    }
  }

  //Add Client Function

  AddClient() {
    console.log(this.ClientForm.value);
    if(!this.editClientData){
      if(this.ClientForm.valid){
        this.ClientApi.postClient(this.ClientForm.value).subscribe({
          next: (res)=>{
            alert("Client Added Successfully!");
            this.clientCount++;
            console.log(this.clientCount);
            this.ClientForm.reset();
            this.clientDialogRef.close('Register');
            this.child.getAllClients();
          },
          error : ()=>{
            alert("Error while Adding client");
          }
        });
      } 
    }else{
      this.updateClient();
    }
  }

  //Update Client Info

  updateClient(){
    this.ClientApi.putClient(this.ClientForm.value , this.editClientData.id).subscribe({
      next:(res)=>{
        alert("Client Updated Successfully");
        this.ClientForm.reset();
        this.clientDialogRef.close('Update');
        
      },
      error :()=>{
        alert("Error while updating Client!");
      }
    })
  }
  clear(){
    this.ClientForm.reset();
  }
}
