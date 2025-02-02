import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-main-layout',
  standalone: false,
  
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit {
  currentRoute: string = 'inicio';
  showNotifications: boolean = false;
  showUserMenu: boolean = false;
  showLogoutModal: boolean = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const path = event.url.split('/');
      this.currentRoute = path[path.length - 1] || 'inicio';
    });
  }

  ngOnInit(): void {
    // Asegurar que 'inicio' esté seleccionado por defecto
    const path = this.router.url.split('/');
    this.currentRoute = path[path.length - 1] || 'inicio';
  }

  onMenuClick(route: string): void {
    if (['documentos', 'autoestudio', 'evaluaciones', 'solicitudes'].includes(route)) {
      this.router.navigate(['/dashboard/' + route]);
      this.currentRoute = route;
      return;
    }
    
    if (route !== 'inicio') {
      console.log('Opción en desarrollo:', route);
      return;
    }
    
    this.router.navigate(['/dashboard/inicio']);
    this.currentRoute = route;
  }

  toggleNotifications(): void {
    this.router.navigate(['/dashboard/notificaciones']);
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
    this.showNotifications = false;
  }

  async logout(): Promise<void> {
    this.showLogoutModal = true;
  }

  cancelLogout(): void {
    this.showLogoutModal = false;
  }

  confirmLogout(): void {
    this.showLogoutModal = false;
    this.router.navigate(['/login']);
  }
}
