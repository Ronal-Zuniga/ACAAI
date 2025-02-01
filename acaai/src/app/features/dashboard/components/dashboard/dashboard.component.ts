import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Inicialización del componente
  }

  ngAfterViewInit(): void {
    this.initializeProgressCircles();
  }

  private initializeProgressCircles(): void {
    const circles = document.querySelectorAll('.progress-circle');
    circles.forEach(circle => {
      const progress = circle.getAttribute('data-progress');
      if (progress) {
        const degrees = (parseInt(progress) / 100) * 360;
        (circle as HTMLElement).style.setProperty('--progress', `${degrees}deg`);
      }
    });
  }

  logout(): void {
    // Implementar lógica de cierre de sesión
    this.router.navigate(['/login']);
  }
}
