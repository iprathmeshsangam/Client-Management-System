import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'',component : HomepageComponent},
  {path:'Clients', component: ClientListComponent},
  {path: 'Meetings', component: MeetingListComponent},
  {path:'Home-Page', component: HomepageComponent},
  {path:"**", component : PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
