import { Component, OnInit } from '@angular/core';

interface Notification {
  id: number;
  type: 'reminder' | 'document' | 'evaluation' | 'deadline';
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  isImportant: boolean;
  isArchived: boolean;
}

interface NotificationGroup {
  key: string;
  value: Notification[];
}

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
  standalone: false
})
export class NotificationListComponent implements OnInit {
  notifications: Notification[] = [];
  filteredNotifications: Notification[] = [];
  currentFilter: 'all' | 'unread' | 'important' | 'archived' = 'all';
  searchTerm: string = '';

  stats = {
    total: 156,
    unread: 23,
    important: 5
  };

  constructor() {
    this.notifications = this.getMockNotifications();
    this.filteredNotifications = [...this.notifications];
  }

  ngOnInit(): void { }

  private getMockNotifications(): Notification[] {
    return [
      {
        id: 1,
        type: 'evaluation',
        title: 'Nueva evaluación asignada',
        description: 'Se te ha asignado la evaluación del programa de Ingeniería Civil',
        time: '2024-03-20T10:30:00',
        isRead: false,
        isImportant: true,
        isArchived: false
      },
      {
        id: 2,
        type: 'document',
        title: 'Documento rechazado',
        description: 'El documento "Informe de Autoevaluación" ha sido rechazado',
        time: '2024-03-20T09:15:00',
        isRead: false,
        isImportant: true,
        isArchived: false
      },
      {
        id: 3,
        type: 'deadline',
        title: 'Fecha límite próxima',
        description: 'La entrega del informe final vence en 48 horas',
        time: '2024-03-19T16:45:00',
        isRead: false,
        isImportant: true,
        isArchived: false
      },
      // Más notificaciones mock...
    ];
  }

  onFilterChange(filter: 'all' | 'unread' | 'important' | 'archived'): void {
    this.currentFilter = filter;
    this.applyFilters();
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = this.notifications;

    // Aplicar filtro de estado
    switch (this.currentFilter) {
      case 'unread':
        filtered = filtered.filter(n => !n.isRead);
        break;
      case 'important':
        filtered = filtered.filter(n => n.isImportant);
        break;
      case 'archived':
        filtered = filtered.filter(n => n.isArchived);
        break;
    }

    // Aplicar búsqueda
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(n =>
        n.title.toLowerCase().includes(term) ||
        n.description.toLowerCase().includes(term)
      );
    }

    this.filteredNotifications = filtered;
  }

  markAsRead(notification: Notification): void {
    notification.isRead = !notification.isRead;
    // Aquí se llamaría al servicio para actualizar en el backend
  }

  toggleImportant(notification: Notification): void {
    notification.isImportant = !notification.isImportant;
    // Aquí se llamaría al servicio para actualizar en el backend
  }

  archive(notification: Notification): void {
    notification.isArchived = true;
    this.applyFilters();
    // Aquí se llamaría al servicio para actualizar en el backend
  }

  getGroupDate(date: string): string {
    const notificationDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (notificationDate.toDateString() === today.toDateString()) {
      return 'Hoy';
    } else if (notificationDate.toDateString() === yesterday.toDateString()) {
      return 'Ayer';
    } else {
      return 'Esta semana';
    }
  }

  getTimeAgo(date: string): string {
    const now = new Date();
    const notificationDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - notificationDate.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'Hace unos minutos';
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `Hace ${diffInDays} ${diffInDays === 1 ? 'día' : 'días'}`;
    }
  }
} 