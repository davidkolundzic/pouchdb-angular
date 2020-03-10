import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CRUDComponent } from './crud/crud.component';


const routes: Routes = [
  { path: 'crud', component: CRUDComponent},
  // { path: '', component: AppComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
