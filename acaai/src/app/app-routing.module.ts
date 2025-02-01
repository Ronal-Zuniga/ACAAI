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
      // Aquí irán las demás rutas hijas
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
