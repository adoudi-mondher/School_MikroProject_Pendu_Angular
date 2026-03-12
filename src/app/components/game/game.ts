import { Component, inject } from '@angular/core';
import { GameService } from '../../services/game';
import { HangmanDrawComponent } from "./hangman-draw/hangman-draw";
import { TopbarComponent } from "../topbar/topbar";

@Component({
  selector: 'app-game',
  imports: [HangmanDrawComponent, TopbarComponent],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game {
  game = inject(GameService);
}
