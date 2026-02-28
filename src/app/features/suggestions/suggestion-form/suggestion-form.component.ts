import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionService } from '../suggestion.service';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './suggestion-form.component.html',
  styleUrl: './suggestion-form.component.css'
})
export class SuggestionFormComponent implements OnInit {
  suggestionForm: FormGroup;
  editId: number | null = null;

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
    private router: Router,
    private route: ActivatedRoute
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

  ngOnInit(): void {
    const idParam = this.route.snapshot.params['id'];
    if (idParam) {
      this.editId = +idParam;
      this.suggestionService.getSuggestionById(this.editId).subscribe(suggestion => {
        this.suggestionForm.patchValue({
          title: suggestion.title,
          description: suggestion.description,
          category: suggestion.category
        });
      });
    }
  }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      if (this.editId) {
        const updated: Suggestion = {
          id: this.editId,
          title: this.suggestionForm.value.title,
          description: this.suggestionForm.value.description,
          category: this.suggestionForm.value.category,
          date: new Date(),
          status: 'en attente',
          nbLikes: 0
        };
        this.suggestionService.updateSuggestion(updated).subscribe(() => {
          this.router.navigate(['/suggestions']);
        });
      } else {
        const newSuggestion: Suggestion = {
          id: 0,
          title: this.suggestionForm.value.title,
          description: this.suggestionForm.value.description,
          category: this.suggestionForm.value.category,
          date: new Date(),
          status: 'en attente',
          nbLikes: 0
        };
        this.suggestionService.addSuggestion(newSuggestion).subscribe(() => {
          this.router.navigate(['/suggestions']);
        });
      }
    }
  }
}


