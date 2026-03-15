import { Component, inject, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameService } from '../../services/game';
import { HangmanDrawComponent } from './hangman-draw/hangman-draw';

@Component({
  selector: 'app-game',
  imports: [HangmanDrawComponent, RouterLink],
  templateUrl: './game.html',
  styleUrl: './game.css'
})
export class GameComponent implements OnInit {
  protected game = inject(GameService);

  // Au chargement du composant → on démarre une partie
  ngOnInit(): void {
    this.game.newGame();
  }

  // On écoute le clavier sur toute la page
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const letter = event.key.toLowerCase();

    // On accepte seulement les lettres a-z
    if (/^[a-z]$/.test(letter)) {
      this.game.guessLetter(letter);
      
    }
  }
}