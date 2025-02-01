import { Component, OnInit } from '@angular/core';

interface Document {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  status: 'valid' | 'reviewing' | 'error';
  type: string;
  url?: string;
}

@Component({
  selector: 'app-document-upload',
  standalone: false,
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {
  documents: Document[] = [
    {
      id: '1',
      name: 'convenio_constitucion.pdf',
      size: '2.5 MB',
      uploadDate: '12/03/2024',
      status: 'valid',
      type: 'application/pdf'
    },
    {
      id: '2',
      name: 'informe_autoevaluacion.pdf',
      size: '5.8 MB',
      uploadDate: '11/03/2024',
      status: 'reviewing',
      type: 'application/pdf'
    },
    {
      id: '3',
      name: 'plan_mejora.docx',
      size: '1.2 MB',
      uploadDate: '10/03/2024',
      status: 'error',
      type: 'application/msword'
    }
  ];

  selectedDocument: Document | null = null;
  totalRequired: number = 6;
  uploadedValid: number = 4;
  isDragging: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }

  handleFiles(files: FileList): void {
    Array.from(files).forEach(file => {
      const newDoc: Document = {
        id: Date.now().toString(),
        name: file.name,
        size: this.formatFileSize(file.size),
        uploadDate: new Date().toLocaleDateString(),
        status: 'reviewing',
        type: file.type,
        url: URL.createObjectURL(file)
      };
      this.documents.unshift(newDoc);
    });
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  selectDocument(doc: Document): void {
    this.selectedDocument = doc;
  }

  deleteDocument(id: string): void {
    const index = this.documents.findIndex(doc => doc.id === id);
    if (index !== -1) {
      if (this.selectedDocument?.id === id) {
        this.selectedDocument = null;
      }
      this.documents.splice(index, 1);
    }
  }

  downloadDocument(doc: Document): void {
    // Implementar lógica de descarga
    console.log('Descargando documento:', doc.name);
  }

  viewDetails(doc: Document): void {
    // Implementar lógica para ver detalles
    console.log('Viendo detalles de:', doc.name);
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'valid': return 'bi bi-check-circle-fill text-success';
      case 'reviewing': return 'bi bi-clock-fill text-warning';
      case 'error': return 'bi bi-x-circle-fill text-danger';
      default: return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'valid': return 'Válido';
      case 'reviewing': return 'En revisión';
      case 'error': return 'Error';
      default: return '';
    }
  }

  finishUpload(): void {
    // Implementar lógica para finalizar la carga
    console.log('Finalizando carga de documentos');
  }
} 