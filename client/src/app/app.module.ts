import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { ServicesModule } from './services/services.module';
import { WordPreviewModule } from './word-preview/word-preview.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ServicesModule,
    WordPreviewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
