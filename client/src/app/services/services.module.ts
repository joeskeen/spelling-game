import { NgModule } from '@angular/core';
import { SpeechService } from './speech/speech.service';
import { HttpClientModule } from '@angular/common/http';
import { SpellingListService } from './spelling-list/spelling-list.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [SpeechService, SpellingListService]
})
export class ServicesModule {}
