import { Injectable } from '@angular/core';

@Injectable()
export class SpeechService {
  constructor() {
    if (!speechSynthesis) {
      throw new Error(`Your browser doesn't support Speech Synthesis :(`);
    }
  }

  say(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }

  shutUp() {
    speechSynthesis.cancel();
  }
}
