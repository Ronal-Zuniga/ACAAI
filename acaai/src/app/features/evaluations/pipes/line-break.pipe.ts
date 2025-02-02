import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'lineBreak',
  standalone: false
})
export class LineBreakPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string): SafeHtml {
    if (!value) return '';

    // Reemplazar saltos de línea con elementos <p>
    const withParagraphs = value.split('\n\n')
      .filter(paragraph => paragraph.trim() !== '')
      .map(paragraph => `<p>${paragraph.trim()}</p>`)
      .join('');

    // Sanitizar el HTML resultante
    return this.sanitizer.bypassSecurityTrustHtml(withParagraphs);
  }
} 