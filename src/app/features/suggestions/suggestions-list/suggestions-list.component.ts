import { Component, OnInit } from '@angular/core';
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
export class SuggestionsListComponent implements OnInit {
  searchText: string = '';
  favorites: Suggestion[] = [];
  suggestions: Suggestion[] = [];

  constructor(private suggestionService: SuggestionService, private router: Router) {}

  ngOnInit(): void {
    this.loadSuggestions();
  }

  loadSuggestions(): void {
    this.suggestionService.getSuggestions().subscribe(data => {
      this.suggestions = data;
    });
  }

  navigateToAdd(): void {
    this.router.navigate(['/suggestions/add']);
  }

  deleteSuggestion(id: number): void {
    this.suggestionService.deleteSuggestion(id).subscribe(() => {
      this.loadSuggestions();
      this.router.navigate(['/suggestions']);
    });
  }

  likeSuggestion(suggestion: Suggestion): void {
    suggestion.nbLikes++;
    this.suggestionService.updateNbLikes(suggestion.id, suggestion.nbLikes).subscribe();
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



