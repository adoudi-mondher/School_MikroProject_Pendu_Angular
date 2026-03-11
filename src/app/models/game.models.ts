// Représente l'état de la partie en cours
export interface GameState {
  word: string;                          // le mot à deviner
  guessedLetters: string[];              // lettres déjà jouées
  errors: number;                        // nombre d'erreurs (max 5)
  status: 'playing' | 'won' | 'lost';   // état de la partie
  isLoading: boolean;                    // chargement du mot via API
}

// Représente une partie terminée (pour l'historique)
export interface GameHistory {
  word: string;                          // le mot à deviner
  guessedLetters: string[];             // lettres jouées pendant la partie
  errors: number;                        // nombre d'erreurs faites
  status: 'won' | 'lost';              // résultat final
  date: Date;                            // date de la partie
}

// Représente un mot retourné par l'API
export interface ApiWord {
  word: string;       // le mot
  length: number;     // longueur du mot
  category: string;   // catégorie (animals, sports, countries...)
  language: string;   // langue (fr)
}