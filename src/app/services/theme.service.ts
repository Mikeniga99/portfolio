import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'mikel-portfolio-theme';
  isDark = signal(false);

  constructor() {
    const saved = localStorage.getItem(this.THEME_KEY);
    if (saved) {
      this.isDark.set(saved === 'dark');
      this.applyTheme(this.isDark());
    } else {
      // Optional: check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDark.set(prefersDark);
      this.applyTheme(prefersDark);
    }
  }

  toggleTheme() {
    this.isDark.set(!this.isDark());
    this.applyTheme(this.isDark());
    localStorage.setItem(this.THEME_KEY, this.isDark() ? 'dark' : 'light');
  }

  private applyTheme(dark: boolean) {
    if (dark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}
