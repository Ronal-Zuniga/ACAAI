import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layout/main-layout/main-layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./features/auth/auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', loadChildren: () => import('./features/dashboard/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'documentos', loadChildren: () => import('./features/documents/documents.module').then(m => m.DocumentsModule) },
      { path: 'autoestudio', loadChildren: () => import('./features/self-study/self-study.module').then(m => m.SelfStudyModule) },
      { path: 'evaluaciones', loadChildren: () => import('./features/evaluations/evaluations.module').then(m => m.EvaluationsModule) },
      { path: 'solicitudes', loadChildren: () => import('./features/requests/requests.module').then(m => m.RequestsModule) },
      { path: 'notificaciones', loadChildren: () => import('./features/notifications/notifications.module').then(m => m.NotificationsModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
