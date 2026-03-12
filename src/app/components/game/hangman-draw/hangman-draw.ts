import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hangman-draw',
  templateUrl: './hangman-draw.html',
  styleUrl: './hangman-draw.css'
})
export class HangmanDrawComponent {
  // Input Signal — reçoit le nb d'erreurs depuis le composant parent (game)
  errors = input.required<number>();
}