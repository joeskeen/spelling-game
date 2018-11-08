import { Component, OnInit } from '@angular/core';
import { SpeechService } from '../services/speech/speech.service';
import {
  SpellingListService,
  SpellingList,
  SpellingWord
} from '../services/spelling-list/spelling-list.service';

@Component({
  selector: 'app-word-preview',
  templateUrl: 'word-preview.component.html',
  styleUrls: ['word-preview.component.scss']
})
export class WordPreviewComponent implements OnInit {
  list: SpellingList;
  current: SpellingWord;
  masteredWords: SpellingWord[] = [];
  unmasteredWords: SpellingWord[] = [];
  enteredWord: string;

  constructor(
    private speech: SpeechService,
    private spellingList: SpellingListService
  ) {}

  async ngOnInit() {
    await this.speech.init();
    this.spellingList.getList().subscribe(l => {
      this.list = l;
      this.startActivity();
    });
  }

  startActivity() {
    this.unmasteredWords = this.list.words.slice();
    this.masteredWords = [];
    this.nextWord();
  }

  async repeatWord() {
    await this.speech.say(this.current.word);
  }

  async nextWord() {
    try {
      if (!this.unmasteredWords.length) {
        throw new Error('no more spelling words');
      }
      this.enteredWord = '';
      this.current = this.unmasteredWords.sort(this.randomOrder)[0];
      await this.speech.say(this.current.word);
      await this.speech.say(
        this.current.sentence.replace(/_+/g, this.current.word)
      );
      await this.speech.spell(this.current.word);
      await this.speech.say(this.current.word);
    } catch (error) {
      console.error(error);
    }
  }

  async onMastered() {
    await this.speech.say('Correct!');
    this.masteredWords.push(this.current);
    this.unmasteredWords = this.unmasteredWords.filter(
      sw => sw.word !== this.current.word
    );
    if (this.unmasteredWords.length) {
      await this.nextWord();
    } else {
      await this.onActivityCompleted();
    }
  }

  async onActivityCompleted() {
    this.current = null;
    await this.speech.say('Congratulations!');
  }

  async onMissed() {
    await this.speech.say(`"${this.current.word}" is spelled`);
    await this.speech.spell(this.current.word);
    await this.speech.say(this.current.word);
    await this.nextWord();
  }

  randomOrder() {
    return Math.random() > 0.5 ? 1 : -1;
  }

  async checkWord() {
    if (
      this.current.word.toLowerCase() === (this.enteredWord || '').toLowerCase()
    ) {
      await this.onMastered();
    } else {
      await this.onMissed();
    }
  }
}
