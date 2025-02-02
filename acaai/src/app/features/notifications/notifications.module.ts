import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { SharedModule } from '../../shared/shared.module';
import { GroupByPipe } from './pipes/group-by.pipe';

const routes: Routes = [
  { path: '', component: NotificationListComponent }
];

@NgModule({
  declarations: [
    NotificationListComponent,
    GroupByPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class NotificationsModule { } 