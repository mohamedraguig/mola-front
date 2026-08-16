import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  activeSection = 'home';

  sections = [
    'home',
    'about',
    'menu',
    'gallery',
    'contact'
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateActiveSection();
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateActiveSection();
    }
  }

  private updateActiveSection(): void {
    const scrollPosition = window.scrollY + 150;

    for (const sectionId of this.sections) {
      const section = document.getElementById(sectionId);

      if (!section) {
        continue;
      }

      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionBottom
      ) {
        this.activeSection = sectionId;
        break;
      }
    }
  }
}
