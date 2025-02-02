import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Request {
  id: string;
  programName: string;
  institution: string;
  status: 'pending' | 'review' | 'approved' | 'rejected';
  type: string;
  submissionDate: string;
  lastUpdate: string;
  progress: number;
  documents: {
    constitution: boolean;
    declaration: boolean;
    contract: boolean;
    payment: boolean;
  };
}

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css'],
  standalone: false
})
export class RequestListComponent implements OnInit {
  requests: Request[] = [
    {
      id: '1',
      programName: 'Ingeniería de Software',
      institution: 'Universidad Nacional',
      status: 'pending',
      type: 'Acreditación Inicial',
      submissionDate: '2024-03-15',
      lastUpdate: '2024-03-20',
      progress: 75,
      documents: {
        constitution: true,
        declaration: true,
        contract: true,
        payment: false
      }
    },
    {
      id: '2',
      programName: 'Arquitectura',
      institution: 'Universidad Central',
      status: 'review',
      type: 'Reacreditación',
      submissionDate: '2024-03-10',
      lastUpdate: '2024-03-18',
      progress: 90,
      documents: {
        constitution: true,
        declaration: true,
        contract: true,
        payment: true
      }
    },
    {
      id: '3',
      programName: 'Ingeniería Civil',
      institution: 'Instituto Tecnológico',
      status: 'approved',
      type: 'Acreditación Inicial',
      submissionDate: '2024-02-28',
      lastUpdate: '2024-03-15',
      progress: 100,
      documents: {
        constitution: true,
        declaration: true,
        contract: true,
        payment: true
      }
    }
  ];

  filteredRequests: Request[] = [];
  searchTerm: string = '';
  statusFilter: string = 'all';

  constructor(private router: Router) {
    this.filteredRequests = this.requests;
  }

  ngOnInit(): void {
    this.applyFilters();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'review': return 'status-review';
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'review': return 'En Revisión';
      case 'approved': return 'Aprobada';
      case 'rejected': return 'Rechazada';
      default: return status;
    }
  }

  createNewRequest(): void {
    this.router.navigate(['/dashboard/solicitudes/nueva']);
  }

  editRequest(id: string): void {
    this.router.navigate(['/dashboard/solicitudes/editar', id]);
  }

  viewDetails(id: string): void {
    console.log('Ver detalles de solicitud:', id);
  }

  deleteRequest(id: string): void {
    if (confirm('¿Está seguro de que desea eliminar esta solicitud?')) {
      this.requests = this.requests.filter(req => req.id !== id);
      this.applyFilters();
    }
  }

  applyFilters(): void {
    this.filteredRequests = this.requests.filter(request => {
      const matchesSearch = this.searchTerm === '' ||
        request.programName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        request.institution.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus = this.statusFilter === 'all' || request.status === this.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.applyFilters();
  }

  onStatusFilterChange(status: string): void {
    this.statusFilter = status;
    this.applyFilters();
  }

  getDocumentStatus(document: boolean): string {
    return document ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger';
  }
} 