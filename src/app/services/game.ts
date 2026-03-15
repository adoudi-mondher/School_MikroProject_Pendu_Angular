import { Injectable, inject, signal, computed } from '@angular/core';
import { WordApiService } from './word-api';
import { GameState, GameHistory } from '../models/game.models';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  // On injecte le service API
  private wordApi = inject(WordApiService);

  // L'état de la partie — signal car il change souvent
  private state = signal<GameState>({
    word: '',
    guessedLetters: [],
    errors: 0,
    status: 'playing',
    isLoading: false
  });

  // L'historique des parties terminées
  private history = signal<GameHistory[]>([]);

  // Série de victoires consécutives en cours
  private consecutiveWins = signal<number>(0);

  // Meilleur record atteint
  private record = signal<number>(0);

  // On les expose en lecture seule pour les composants
  readonly currentStreak = computed(() => this.consecutiveWins());
  readonly bestRecord = computed(() => this.record());

  // Signals calculés automatiquement depuis state
  // Angular les met à jour tout seul quand state change
  readonly word = computed(() => this.state().word);
  readonly errors = computed(() => this.state().errors);
  readonly status = computed(() => this.state().status);
  readonly guessedLetters = computed(() => this.state().guessedLetters);
  readonly isLoading = computed(() => this.state().isLoading);
  readonly gameHistory = computed(() => this.history());

  // Démarre une nouvelle partie
  newGame(): void {
    // On indique que le chargement commence
    this.state.update(s => ({ ...s, isLoading: true }));

    // On appelle l'API pour récupérer un nouveau mot
    this.wordApi.getRandomWord().subscribe({
      next: (word) => {
        // L'API a répondu — on remet tout à zéro avec le nouveau mot
        this.state.set({
          word: word,
          guessedLetters: [],
          errors: 0,
          status: 'playing',
          isLoading: false
        });
      },
      error: () => {
        // L'API a planté — on arrête le chargement
        this.state.update(s => ({ ...s, isLoading: false }));
      }
    });
  }

  // Traite une lettre jouée par le joueur
  guessLetter(letter: string): void {
    const currentState = this.state();

    // Sécurités — on ignore si :
    if (currentState.status !== 'playing') return; // partie terminée
    if (currentState.guessedLetters.includes(letter)) return; // lettre déjà jouée

    // On ajoute la lettre aux lettres jouées
    const newGuessedLetters = [...currentState.guessedLetters, letter];

    // La lettre est-elle dans le mot ?
    const isCorrect = currentState.word.includes(letter);

    // On calcule le nouveau nombre d'erreurs
    const newErrors = isCorrect ? currentState.errors : currentState.errors + 1;

    // Victoire ? Toutes les lettres du mot sont trouvées
    const isWon = currentState.word
      .split('')
      .every(l => newGuessedLetters.includes(l));

    // Défaite ? 5 erreurs atteintes
    const isLost = newErrors >= 5;

    // On détermine le nouveau statut
    const newStatus = isWon ? 'won' : isLost ? 'lost' : 'playing';

    // On met à jour le state
    this.state.update(s => ({
      ...s,
      guessedLetters: newGuessedLetters,
      errors: newErrors,
      status: newStatus
    }));

    // Si la partie est terminée → on sauvegarde dans l'historique
    if (newStatus !== 'playing') {
      this.saveToHistory(newStatus);
    }
  }

  // Sauvegarde une partie terminée dans l'historique
  private saveToHistory(status: 'won' | 'lost'): void {
    const currentState = this.state();

    const gameRecord: GameHistory = {
      word: currentState.word,
      guessedLetters: currentState.guessedLetters,
      errors: currentState.errors,
      status: status,
      date: new Date()
    };

    this.history.update(h => [gameRecord, ...h]);

    // Mise à jour de la série
    if (status === 'won') {
      this.consecutiveWins.update(n => n + 1);
      // Si la série dépasse le record → on met à jour le record
      if (this.consecutiveWins() > this.record()) {
        this.record.set(this.consecutiveWins());
      }
    } else {
      // Défaite → on remet la série à zéro
      this.consecutiveWins.set(0);
    }
  }
}


