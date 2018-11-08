import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CashmereModule } from './cashmere.module';
import { AppComponent } from './app.component';
import { ServicesModule } from './services/services.module';
import { WordPreviewModule } from './word-preview/word-preview.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CashmereModule,
    ServicesModule,
    WordPreviewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
