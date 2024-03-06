import { Component, OnInit ,ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
//Mat Design
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddClientComponent } from '../add-client/add-client.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit{
  Today  = new Date();
  //declaring all DataSource / Table heade

  displayedColumns : string [] = [
    'id',
    'FirstName',
    'LastName',
    'Email',
    'Address',
    'action'
  ]

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  constructor(private getClientApi: ApiService,
    private clientDialogRef : MatDialog){}


    //Function Calling for data
    ngOnInit(): void {
      this.getAllClients()
  }

  getAllClients(){
    this.getClientApi.getClient().subscribe({
      next :(res)=>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },  
      error:()=>{
        alert("Error while fetching the Clients Records");
      }
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


//Edit Client
editClient(row : any){
  this.clientDialogRef
  .open(AddClientComponent , {
    width : '30%',
    data : row
  })
  .afterClosed()
  .subscribe(val=>{
    if(val === 'Update'){
      this.getAllClients();
    }
  });
}

//delete Client

DeleteClient(id : any){
  this.getClientApi.deleteClient(id).subscribe({
    next:(res)=>{
      alert("Deleted Client Successfully!")
      this.getAllClients();
    },
    error: ()=>{
      alert("Error Deleting the Client");
    }
  });
}

  //end
}
