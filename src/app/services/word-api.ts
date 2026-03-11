import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiWord } from '../models/game.models';

@Injectable({
  providedIn: 'root'
})
export class WordApiService {

  // On injecte HttpClient pour faire des appels HTTP
  private http = inject(HttpClient);

  // L'URL de l'API
  private apiUrl = 'https://random-words-api.kushcreates.com/api?language=fr&type=lowercase&words=1';

  // Retourne un seul mot aléatoire depuis l'API
  getRandomWord(): Observable<string> {
    return this.http.get<ApiWord[]>(this.apiUrl).pipe(
      map(words => words[0].word)
    );
  }
}