import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CRUDComponent } from './crud/crud.component';
import { BulkComponent } from './bulk/bulk.component';
import { VideoComponent } from './video/video.component';
import { GlasNadeComponent } from './glas-nade/glas-nade.component';

@NgModule({
  declarations: [
    AppComponent,
    CRUDComponent,
    BulkComponent,
    VideoComponent,
    GlasNadeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
