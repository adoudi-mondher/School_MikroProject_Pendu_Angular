import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game {

}

export class GameComponent {
  private wordApi = inject(WordApiService);

  // $ = c'est un Observable, le template fera | async
  mot$ = this.wordApi.getRandomWord();
}
