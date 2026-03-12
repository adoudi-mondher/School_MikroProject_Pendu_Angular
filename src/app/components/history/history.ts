import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameService } from '../../services/game';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [RouterLink, DatePipe],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class History {
  protected game = inject(GameService);
}