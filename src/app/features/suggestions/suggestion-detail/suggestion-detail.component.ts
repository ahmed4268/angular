import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../suggestion.service';

@Component({
  selector: 'app-suggestion-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './suggestion-detail.component.html',
  styleUrl: './suggestion-detail.component.css'
})
export class SuggestionDetailComponent implements OnInit {
  suggestion: Suggestion | undefined;
  suggestionId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    this.suggestionId = +this.route.snapshot.params['id'];
    this.suggestionService.getSuggestionById(this.suggestionId).subscribe(data => {
      this.suggestion = data;
    });
  }

  navigateToEdit(): void {
    this.router.navigate(['/suggestions/edit', this.suggestionId]);
  }
}


