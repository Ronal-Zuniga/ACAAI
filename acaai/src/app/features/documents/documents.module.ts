import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DocumentUploadComponent } from './components/document-upload/document-upload.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: DocumentUploadComponent }
];

@NgModule({
  declarations: [
    DocumentUploadComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class DocumentsModule { } 