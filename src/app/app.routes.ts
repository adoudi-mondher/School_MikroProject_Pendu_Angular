import { Routes } from '@angular/router';
import { GameComponent } from './components/game/game';
import { History } from './components/history/history';

export const routes: Routes = [
  // Route principale → la page de jeu
  { path: '', component: GameComponent },

  // Route historique → la page d'historique
  { path: 'history', component: History },
];