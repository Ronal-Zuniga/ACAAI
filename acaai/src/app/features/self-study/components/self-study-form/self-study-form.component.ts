import { Component, OnInit, OnDestroy, HostListener, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface Section {
  id: number;
  title: string;
  progress: number;
  subsections: Subsection[];
}

interface Subsection {
  id: number;
  title: string;
  completed: boolean;
  fields: FormField[];
}

interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'file' | 'radio';
  label: string;
  required: boolean;
  options?: string[];
  value?: any;
}

@Component({
  selector: 'app-self-study-form',
  standalone: false,
  templateUrl: './self-study-form.component.html',
  styleUrls: ['./self-study-form.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      transition('void <=> *', animate('200ms ease-in-out'))
    ]),
    trigger('slideInOut', [
      state('void', style({
        transform: 'translateX(-100%)'
      })),
      transition('void <=> *', animate('200ms ease-in-out'))
    ])
  ]
})
export class SelfStudyFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  currentSection: number = 1;
  lastSaved: Date = new Date();
  autoSaveInterval: any;
  isSidebarVisible: boolean = true;
  isSmallScreen: boolean = false;
  savingInProgress: boolean = false;
  formTouched: boolean = false;
  isLoading: boolean = true;

  // Datos precargados para demostración
  mockData = {
    institutionName: 'Universidad Ejemplo',
    programName: 'Ingeniería de Software',
    accreditationLevel: ['Nacional', 'Internacional'],
    facilities: 'El campus cuenta con instalaciones modernas...',
    equipment: ['Laboratorios', 'Biblioteca', 'Salas de Cómputo'],
    admissionProcess: 'El proceso de admisión incluye...',
    evaluationMethods: ['Exámenes', 'Proyectos'],
    graduationRate: '85%',
    employmentRate: '92%'
  };

  sections: Section[] = [
    {
      id: 1,
      title: '1. Información General',
      progress: 0,
      subsections: [
        {
          id: 1,
          title: '1.1 Datos Básicos',
          completed: false,
          fields: [
            { id: 'institutionName', type: 'text', label: 'Nombre de la Institución', required: true },
            { id: 'programName', type: 'text', label: 'Nombre del Programa', required: true },
            { id: 'accreditationLevel', type: 'multiselect', label: 'Nivel de Acreditación', required: true,
              options: ['Nacional', 'Internacional', 'Regional'] }
          ]
        }
      ]
    },
    {
      id: 2,
      title: '2. Recursos',
      progress: 75,
      subsections: [
        {
          id: 2,
          title: '2.1 Infraestructura',
          completed: true,
          fields: [
            { id: 'facilities', type: 'textarea', label: 'Descripción de Instalaciones', required: true },
            { id: 'equipment', type: 'multiselect', label: 'Equipamiento Disponible', required: true, 
              options: ['Laboratorios', 'Biblioteca', 'Salas de Cómputo', 'Auditorios'] },
            { id: 'photos', type: 'file', label: 'Evidencia Fotográfica', required: true }
          ]
        }
      ]
    },
    {
      id: 3,
      title: '3. Procesos',
      progress: 30,
      subsections: [
        {
          id: 3,
          title: '3.1 Procesos Académicos',
          completed: false,
          fields: [
            { id: 'admissionProcess', type: 'textarea', label: 'Proceso de Admisión', required: true },
            { id: 'evaluationMethods', type: 'multiselect', label: 'Métodos de Evaluación', required: true,
              options: ['Exámenes', 'Proyectos', 'Prácticas', 'Investigación'] }
          ]
        }
      ]
    },
    {
      id: 4,
      title: '4. Resultados',
      progress: 0,
      subsections: [
        {
          id: 4,
          title: '4.1 Indicadores de Desempeño',
          completed: false,
          fields: [
            { id: 'graduationRate', type: 'text', label: 'Tasa de Graduación', required: true },
            { id: 'employmentRate', type: 'text', label: 'Tasa de Empleabilidad', required: true },
            { id: 'statistics', type: 'file', label: 'Estadísticas de Seguimiento', required: true }
          ]
        }
      ]
    }
  ];

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.formTouched && !this.savingInProgress) {
      $event.returnValue = '¿Estás seguro de que quieres salir? Los cambios no guardados se perderán.';
    }
  }

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({});
    this.checkScreenSize();
    this.initializeForm();
  }

  ngOnInit(): void {
    this.startAutoSave();
    this.calculateProgress();
    this.isLoading = false;
    this.cdr.detectChanges();
  }

  private checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth < 992;
    if (this.isSmallScreen) {
      this.isSidebarVisible = false;
    }
  }

  private initializeForm(): void {
    // Inicializamos el formulario con los datos mock
    this.sections.forEach(section => {
      section.subsections.forEach(subsection => {
        subsection.fields.forEach(field => {
          const validators = field.required ? [Validators.required] : [];
          const initialValue = this.mockData[field.id as keyof typeof this.mockData] || '';
          
          if (field.type === 'multiselect') {
            this.form.addControl(field.id, this.fb.control(initialValue || [], validators));
          } else {
            this.form.addControl(field.id, this.fb.control(initialValue || '', validators));
          }
        });
      });
    });

    // Calculamos el progreso inicial
    this.calculateProgress();
    this.updateSubsectionStatus();

    // Suscribirse a cambios
    this.form.valueChanges.subscribe(() => {
      this.formTouched = true;
      this.calculateProgress();
      this.updateSubsectionStatus();
    });
  }

  private updateSubsectionStatus(): void {
    this.sections.forEach(section => {
      section.subsections.forEach(subsection => {
        const allFieldsValid = subsection.fields.every(field => {
          const control = this.form.get(field.id);
          if (!control) return false;
          
          const value = control.value;
          if (Array.isArray(value)) {
            return value.length > 0;
          }
          return value && value.trim() !== '';
        });
        
        subsection.completed = allFieldsValid;
      });
    });
  }

  private calculateProgress(): void {
    this.sections.forEach(section => {
      let totalFields = 0;
      let completedFields = 0;

      section.subsections.forEach(subsection => {
        subsection.fields.forEach(field => {
          totalFields++;
          const control = this.form.get(field.id);
          if (control && control.value) {
            if (Array.isArray(control.value)) {
              if (control.value.length > 0) completedFields++;
            } else if (typeof control.value === 'string' && control.value.trim() !== '') {
              completedFields++;
            }
          }
        });
      });

      section.progress = totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;
    });
  }

  private startAutoSave(): void {
    this.autoSaveInterval = setInterval(() => {
      if (this.formTouched) {
        this.saveProgress();
      }
    }, 120000);
  }

  async saveProgress(): Promise<void> {
    if (this.savingInProgress) return;

    this.savingInProgress = true;
    try {
      // Simular guardado con un delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Guardando progreso...', this.form.value);
      this.lastSaved = new Date();
      this.formTouched = false;
      
      // Mostrar notificación de éxito
      this.showNotification('Progreso guardado correctamente');
    } catch (error) {
      console.error('Error al guardar:', error);
      this.showNotification('Error al guardar el progreso', true);
    } finally {
      this.savingInProgress = false;
    }
  }

  private showNotification(message: string, isError: boolean = false): void {
    // Implementar lógica de notificación
    console.log(message);
  }

  onSectionChange(sectionId: number): void {
    if (this.formTouched) {
      this.saveProgress();
    }
    this.currentSection = sectionId;
    if (this.isSmallScreen) {
      this.toggleSidebar();
    }
  }

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  getTimeSinceLastSave(): string {
    const now = new Date();
    const diff = Math.floor((now.getTime() - this.lastSaved.getTime()) / 60000);
    if (diff < 1) return 'hace menos de un minuto';
    if (diff === 1) return 'hace 1 minuto';
    return `hace ${diff} minutos`;
  }

  getSectionClass(section: Section): string {
    let classes = '';
    if (section.id === this.currentSection) classes += 'active ';
    if (section.progress === 100) classes += 'completed ';
    else if (section.progress > 0) classes += 'in-progress ';
    return classes.trim();
  }

  onFileSelected(event: Event, fieldId: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (file.size > maxSize) {
        this.showNotification('El archivo es demasiado grande. Máximo 5MB permitido.', true);
        input.value = '';
        return;
      }

      this.form.get(fieldId)?.setValue(file.name);
      this.formTouched = true;
      console.log(`Archivo seleccionado para ${fieldId}:`, file.name);
    }
  }

  async navigateToPrevious(): Promise<void> {
    if (this.currentSection > 1) {
      if (this.formTouched) {
        await this.saveProgress();
      }
      this.currentSection--;
    }
  }

  async navigateToNext(): Promise<void> {
    if (this.currentSection < this.sections.length) {
      if (this.formTouched) {
        await this.saveProgress();
      }
      this.currentSection++;
    }
  }

  async saveAndExit(): Promise<void> {
    if (this.savingInProgress) return;

    this.savingInProgress = true;
    try {
      await this.saveProgress();
      // Aquí iría la lógica de navegación
      console.log('Formulario guardado exitosamente', this.form.value);
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      this.savingInProgress = false;
    }
  }

  ngOnDestroy(): void {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
    }
  }

  onCheckboxChange(event: Event, fieldId: string, option: string): void {
    const checkbox = event.target as HTMLInputElement;
    const control = this.form.get(fieldId);
    if (!control) return;

    const currentValue = control.value || [];
    
    if (checkbox.checked) {
      if (!currentValue.includes(option)) {
        control.setValue([...currentValue, option]);
      }
    } else {
      control.setValue(currentValue.filter((item: string) => item !== option));
    }
    
    this.formTouched = true;
    this.calculateProgress();
  }
} 