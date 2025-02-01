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
    if (route !== 'inicio') {
      // Por ahora solo mostramos un mensaje para las otras opciones
      console.log('Opción en desarrollo:', route);
      return;
    }
    this.currentRoute = route;
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    this.showUserMenu = false;
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
    this.showNotifications = false;
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
