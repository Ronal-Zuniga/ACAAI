import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EvaluationFormComponent } from './components/evaluation-form/evaluation-form.component';
import { LineBreakPipe } from './pipes/line-break.pipe';

const routes: Routes = [
  {
    path: '',
    component: EvaluationFormComponent
  }
];

@NgModule({
  declarations: [
    EvaluationFormComponent,
    LineBreakPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class EvaluationsModule { } 