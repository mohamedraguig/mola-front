import { Component, signal } from '@angular/core';
import { Hero } from "./components/hero/hero";
import { Header } from "./components/header/header";
import { About } from "./components/about/about";
import { Menu } from './components/menu/menu';
import { Gallery } from "./components/gallery/gallery";
import { Contact } from "./components/contact/contact";
import { Footer } from "./components/footer/footer";
import { LoadingService } from './services/loading-service';

@Component({
  selector: 'app-root',
  imports: [Hero, Header, About, Menu, Gallery, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mola-front');

  constructor(public readonly loadingService: LoadingService) {}
}
