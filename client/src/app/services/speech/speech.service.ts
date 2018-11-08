import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';

speechSynthesis.getVoices();

@Injectable()
export class SpeechService {
  preferredVoiceName = 'Google US English';
  voice: SpeechSynthesisVoice;

  constructor() {
    if (!speechSynthesis) {
      throw new Error(`Your browser doesn't support Speech Synthesis :(`);
    }
  }

  async init(): Promise<void> {
    this.say('');
    while (!speechSynthesis.getVoices().length) {
      await new Promise(resolve => setTimeout(resolve, 250));
    }
    const voices = speechSynthesis.getVoices();
    console.log(voices);
    this.voice =
      voices.filter(v => v.name === this.preferredVoiceName)[0] || voices[0];
  }

  async say(text: string): Promise<void> {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = this.voice;
    utterance.rate = 0.65;
    speechSynthesis.speak(utterance);
    while (speechSynthesis.speaking) {
      await new Promise(resolve => setTimeout(resolve, 250));
    }
  }

  async spell(word: string) {
    const letters = word.split('');
    for (const letter of letters) {
      await this.say(letter);
    }
  }

  shutUp() {
    speechSynthesis.cancel();
  }
}
