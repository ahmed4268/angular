import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../suggestion.service';

@Component({
  selector: 'app-suggestions-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './suggestions-list.component.html',
  styleUrl: './suggestions-list.component.css'
})
export class SuggestionsListComponent {
  searchText: string = '';
  favorites: Suggestion[] = [];

  constructor(private suggestionService: SuggestionService, private router: Router) {}

  get suggestions(): Suggestion[] {
    return this.suggestionService.getSuggestions();
  }

  navigateToAdd(): void {
    this.router.navigate(['/suggestions/add']);
  }

  incrementLike(suggestion: Suggestion): void {
    suggestion.nbLikes++;
  }

  addToFavorites(suggestion: Suggestion): void {
    if (!this.favorites.find(fav => fav.id === suggestion.id)) {
      this.favorites.push(suggestion);
    }
  }

  filterSuggestions(): Suggestion[] {
    if (!this.searchText.trim()) {
      return this.suggestions;
    }

    const searchLower = this.searchText.toLowerCase();
    return this.suggestions.filter(suggestion =>
      suggestion.title.toLowerCase().includes(searchLower) ||
      suggestion.category.toLowerCase().includes(searchLower)
    );
  }
}

