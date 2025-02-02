import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface EvaluationCriteria {
  id: string;
  title: string;
  description: string;
  rating: 'A' | 'B' | 'C' | 'D' | null;
  comments: string;
  requirements: Requirement[];
}

interface Requirement {
  id: string;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css'],
  standalone: false
})
export class EvaluationFormComponent implements OnInit {
  evaluationForm: FormGroup = new FormGroup({});
  currentTool: 'highlight' | 'comment' | 'draw' | null = null;
  selectedText: string = '';
  currentHighlight: any = null;
  evaluationProgress: number = 0;
  savingDraft: boolean = false;

  // Contenido de ejemplo para el visor
  sampleContent: string = `
1. RELACIÓN CON EL ENTORNO

1.1. Demandas del entorno
El programa debe justificar su existencia fundamentándose en un estudio de las necesidades y demandas del entorno (área de influencia del programa), describiendo la forma en que el programa responde a esas demandas.

Aspectos a considerar:
a) Identificación de las demandas del entorno y su relación con el programa.
b) Estudios de mercado laboral que fundamenten la existencia del programa.
c) Actividades de vinculación del programa con el entorno.

Estándares:
1.1.1 Debe existir un documento que justifique el programa y exprese las demandas del entorno.
1.1.2 Los estudios de mercado laboral deben actualizarse sistemáticamente.
1.1.3 Debe existir una metodología para identificar y dar seguimiento a las demandas del entorno.
  `;

  // Escala de calificación
  ratingScale = [
    { value: 'A' as const, label: 'A - Sobresaliente', description: 'Cumple de manera sobresaliente con el criterio' },
    { value: 'B' as const, label: 'B - Aceptable', description: 'Cumple satisfactoriamente con el criterio' },
    { value: 'C' as const, label: 'C - Mejorable', description: 'Cumple parcialmente con el criterio' },
    { value: 'D' as const, label: 'D - Insuficiente', description: 'No cumple con el criterio' }
  ];

  criteria: EvaluationCriteria[] = [
    {
      id: 'criterio1.1',
      title: 'Criterio 1.1: Demandas del entorno',
      description: 'Evaluar la justificación del programa en relación con las necesidades y demandas del entorno.',
      rating: null,
      comments: '',
      requirements: [
        { id: 'req1.1.1', text: 'Existe documento de justificación del programa', completed: false },
        { id: 'req1.1.2', text: 'Los estudios de mercado están actualizados', completed: false },
        { id: 'req1.1.3', text: 'Existe metodología de seguimiento', completed: false }
      ]
    }
  ];

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.calculateProgress();
  }

  private initializeForm(): void {
    const formGroup: any = {};
    this.criteria.forEach(criterion => {
      formGroup[`rating_${criterion.id}`] = ['', Validators.required];
      formGroup[`comments_${criterion.id}`] = ['', Validators.required];
      criterion.requirements.forEach(req => {
        formGroup[`req_${req.id}`] = [false];
      });
    });
    this.evaluationForm = this.fb.group(formGroup);

    this.evaluationForm.valueChanges.subscribe(() => {
      this.calculateProgress();
    });
  }

  setRating(criterionId: string, rating: string): void {
    if (rating === 'A' || rating === 'B' || rating === 'C' || rating === 'D') {
      this.evaluationForm.get(`rating_${criterionId}`)?.setValue(rating);
    }
  }

  getRatingDescription(rating: string): string {
    const ratingInfo = this.ratingScale.find(r => r.value === rating);
    return ratingInfo ? ratingInfo.description : '';
  }

  private calculateProgress(): void {
    const totalFields = this.criteria.length * 2; // rating + comments por criterio
    const completedFields = Object.keys(this.evaluationForm.controls)
      .filter(key => key.startsWith('rating_') || key.startsWith('comments_'))
      .filter(key => this.evaluationForm.get(key)?.valid)
      .length;

    this.evaluationProgress = (completedFields / totalFields) * 100;
  }

  async saveDraft(): Promise<void> {
    if (this.evaluationForm.valid) {
      this.savingDraft = true;
      try {
        // Simular guardado
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Guardando borrador...', this.evaluationForm.value);
      } finally {
        this.savingDraft = false;
      }
    }
  }

  previewReport(): void {
    console.log('Previsualizando informe...', {
      formValue: this.evaluationForm.value,
      criteria: this.criteria
    });
  }

  submitEvaluation(): void {
    if (this.evaluationForm.valid) {
      console.log('Enviando evaluación...', {
        formValue: this.evaluationForm.value,
        criteria: this.criteria
      });
    }
  }

  // Métodos para las herramientas de anotación
  setTool(tool: 'highlight' | 'comment' | 'draw'): void {
    this.currentTool = this.currentTool === tool ? null : tool;
  }

  onHighlightText(): void {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() !== '') {
      this.selectedText = selection.toString();
      // Aquí iría la lógica para crear y guardar el highlight
    }
  }

  onRequirementChange(reqId: string, completed: boolean): void {
    this.evaluationForm.get(`req_${reqId}`)?.setValue(completed);
  }
} 