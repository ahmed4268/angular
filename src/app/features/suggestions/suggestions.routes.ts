import { Routes } from '@angular/router';
import { SuggestionsComponent } from './suggestions.component';
import { SuggestionsListComponent } from './suggestions-list/suggestions-list.component';
import { SuggestionDetailComponent } from './suggestion-detail/suggestion-detail.component';

export const SUGGESTIONS_ROUTES: Routes = [
  {
    path: '',
    component: SuggestionsComponent,
    children: [
      { path: '', component: SuggestionsListComponent },
      { path: ':id', component: SuggestionDetailComponent }
    ]
  }
];

