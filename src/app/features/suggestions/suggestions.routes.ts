import { Routes } from '@angular/router';
import { SuggestionsComponent } from './suggestions.component';
import { SuggestionsListComponent } from './suggestions-list/suggestions-list.component';
import { SuggestionDetailComponent } from './suggestion-detail/suggestion-detail.component';
import { SuggestionFormComponent } from './suggestion-form/suggestion-form.component';

export const SUGGESTIONS_ROUTES: Routes = [
  {
    path: '',
    component: SuggestionsComponent,
    children: [
      { path: '', component: SuggestionsListComponent },
      { path: 'add', component: SuggestionFormComponent },
      { path: ':id', component: SuggestionDetailComponent }
    ]
  }
];

