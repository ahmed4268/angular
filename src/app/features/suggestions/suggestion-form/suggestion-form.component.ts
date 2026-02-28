import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SuggestionService } from '../suggestion.service';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './suggestion-form.component.html',
  styleUrl: './suggestion-form.component.css'
})
export class SuggestionFormComponent {
  suggestionForm: FormGroup;

  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  constructor(
    private fb: FormBuilder,
    private suggestionService: SuggestionService,
    private router: Router
  ) {
    const today = new Date().toLocaleDateString('fr-FR');
    this.suggestionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[A-Z][a-zA-Z]*$')]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', Validators.required],
      date: [{ value: today, disabled: true }],
      status: [{ value: 'en attente', disabled: true }]
    });
  }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      const suggestions = this.suggestionService.getSuggestions();
      const maxId = suggestions.length > 0 ? Math.max(...suggestions.map(s => s.id)) : 0;
      const newSuggestion: Suggestion = {
        id: maxId + 1,
        title: this.suggestionForm.value.title,
        description: this.suggestionForm.value.description,
        category: this.suggestionForm.value.category,
        date: new Date(),
        status: 'en attente',
        nbLikes: 0
      };
      this.suggestionService.addSuggestion(newSuggestion);
      this.router.navigate(['/suggestions']);
    }
  }
}

