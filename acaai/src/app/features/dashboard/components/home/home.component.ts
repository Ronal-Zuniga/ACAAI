import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
    // Aquí podemos inicializar datos o hacer llamadas a servicios
  }

  ngAfterViewInit(): void {
    this.initializeProgressCircles();
  }

  private initializeProgressCircles(): void {
    const circles = document.querySelectorAll('.progress-circle');
    circles.forEach(circle => {
      const progress = circle.getAttribute('style')?.match(/--progress:\s*(\d+)%/)?.[1];
      if (progress) {
        const degrees = (parseInt(progress) / 100) * 360;
        circle.setAttribute('style', `--progress: ${degrees}deg`);
      }
    });
  }

  // Métodos para manejar acciones rápidas
  onNewEvaluation(): void {
    console.log('Nueva evaluación iniciada');
    // Implementar lógica para crear nueva evaluación
  }

  onUploadDocuments(): void {
    console.log('Subir documentos');
    // Implementar lógica para subir documentos
  }

  onScheduleMeeting(): void {
    console.log('Agendar reunión');
    // Implementar lógica para agendar reunión
  }

  onGenerateReport(): void {
    console.log('Generar reporte');
    // Implementar lógica para generar reporte
  }

  // Métodos para manejar actividades
  onViewDetails(activity: string): void {
    console.log('Ver detalles de:', activity);
    // Implementar lógica para ver detalles
  }

  onViewReport(program: string): void {
    console.log('Ver reporte de:', program);
    // Implementar lógica para ver reporte
  }
}
