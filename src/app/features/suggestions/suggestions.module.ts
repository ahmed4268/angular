import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { SuggestionsComponent } from './suggestions.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    SuggestionsRoutingModule
  ]
})
export class SuggestionsModule { }

