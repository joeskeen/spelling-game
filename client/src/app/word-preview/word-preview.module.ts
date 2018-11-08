import { NgModule } from '@angular/core';
import { WordPreviewComponent } from './word-preview.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [WordPreviewComponent]
})
export class WordPreviewModule {}
