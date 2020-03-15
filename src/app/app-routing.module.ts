import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CRUDComponent } from './crud/crud.component';
import { BulkComponent } from './bulk/bulk.component';
import { VideoComponent } from './video/video.component';
import { GlasNadeComponent } from './glas-nade/glas-nade.component';


const routes: Routes = [
  { path: 'crud', component: CRUDComponent},
  { path: 'bulk', component: BulkComponent},
  { path: 'video', component: VideoComponent},
  { path: 'uzivo', component: GlasNadeComponent},
  // { path: '', component: AppComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
