import { Injectable } from '@angular/core';

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

  say(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = this.voice;
    utterance.rate = 0.65;
    speechSynthesis.speak(utterance);
  }

  spell(word: string) {
    word.split('').forEach(letter => this.say(letter));
  }

  shutUp() {
    speechSynthesis.cancel();
  }
}
