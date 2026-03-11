import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],        // ← indispensable
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}