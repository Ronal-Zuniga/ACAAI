import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css'],
  standalone: false
})
export class RequestFormComponent implements OnInit {
  requestForm: FormGroup;
  isEditing: boolean = false;
  savingChanges: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.requestForm = this.fb.group({
      programName: ['', Validators.required],
      institution: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      campusCount: [1, [Validators.required, Validators.min(1)]],
      documents: this.fb.group({
        constitution: [null],
        declaration: [null],
        contract: [null],
        payment: [null]
      })
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditing = true;
      // Aquí cargaríamos los datos de la solicitud existente
      this.loadRequestData(id);
    }
  }

  private loadRequestData(id: string): void {
    // Simulamos la carga de datos
    const mockData = {
      programName: 'Ingeniería de Software',
      institution: 'Universidad Nacional',
      type: 'Acreditación Inicial',
      description: 'Programa de ingeniería enfocado en desarrollo de software',
      campusCount: 2,
      documents: {
        constitution: null,
        declaration: null,
        contract: null,
        payment: null
      }
    };

    this.requestForm.patchValue(mockData);
  }

  onFileSelected(event: Event, documentType: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (file.size > maxSize) {
        alert('El archivo es demasiado grande. Máximo 5MB permitido.');
        input.value = '';
        return;
      }

      this.requestForm.get('documents')?.get(documentType)?.setValue(file.name);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.requestForm.valid) {
      this.savingChanges = true;
      try {
        // Simular guardado
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Formulario enviado:', this.requestForm.value);
        this.router.navigate(['/dashboard/solicitudes']);
      } catch (error) {
        console.error('Error al guardar:', error);
      } finally {
        this.savingChanges = false;
      }
    } else {
      Object.keys(this.requestForm.controls).forEach(key => {
        const control = this.requestForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/solicitudes']);
  }
} 