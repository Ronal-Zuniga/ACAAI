import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { RequestListComponent } from './components/request-list/request-list.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: RequestListComponent },
  { path: 'nueva', component: RequestFormComponent },
  { path: 'editar/:id', component: RequestFormComponent }
];

@NgModule({
  declarations: [
    RequestFormComponent,
    RequestListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [DatePipe]
})
export class RequestsModule { } 