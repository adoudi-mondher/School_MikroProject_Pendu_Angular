import { Component, inject } from '@angular/core';
import { GameService } from '../../services/game';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.html',
  styleUrl: './topbar.css'
})
export class TopbarComponent {
  // On injecte le service pour lire les stats
  protected game = inject(GameService);
}