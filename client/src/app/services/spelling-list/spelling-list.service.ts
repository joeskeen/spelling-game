import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SpellingListService {
  constructor(private http: HttpClient) {}

  getList(): Observable<SpellingList> {
    return this.http.get<SpellingList>('./assets/lists/2018-11-07.json');
  }
}

export interface SpellingList {
  name: string;
  source?: string;
  words: SpellingWord[];
}

export interface SpellingWord {
  word: string;
  syllables?: string[];
  sentence: string;
  misspellings: string[];
}
