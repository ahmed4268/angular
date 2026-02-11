import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }

