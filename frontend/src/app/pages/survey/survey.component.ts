import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  loading = signal(true);
  error = signal<string | null>(null);
  result = signal<any>(null);

  async ngOnInit() {
    try {
      // Attempt dynamic import of SurveyJS (assumes it is installed)
      let Survey: any;
      try {
        const mod = await import('survey-core');
        Survey = mod;
      } catch (e) {
        // Fallback: load from CDN if not installed
        await this.loadScript('https://unpkg.com/survey-core/survey.core.min.js');
        // survey-core UMD exposes global Survey at window['Survey'];
        Survey = (window as any)['Survey'];
      }

      if (!Survey) {
        throw new Error('SurveyJS could not be loaded');
      }

      // Build a simple survey JSON
      const surveyJson = {
        title: 'Quick Feedback',
        description: 'Help us improve by answering two quick questions.',
        pages: [
          {
            name: 'page1',
            elements: [
              { type: 'radiogroup', name: 'satisfaction', title: 'How satisfied are you?', choices: ['👍 Great', '🙂 Okay', '👎 Poor'], isRequired: true },
              { type: 'comment', name: 'improve', title: 'What can we improve?' }
            ]
          }
        ],
        showCompletedPage: false
      };

      // If using survey-core only, instantiate model:
      if (Survey.Model) {
        const model = new Survey.Model(surveyJson);
        model.onComplete.add((sender: any) => {
          this.result.set(sender.data);
        });
        // Render manually into container
        setTimeout(() => {
          const el = document.getElementById('surveyContainer');
          if (el) {
            model.render(el);
          }
          this.loading.set(false);
        });
      } else {
        throw new Error('Survey.Model not available');
      }
    } catch (err: any) {
      this.error.set(err?.message || 'Unknown error loading survey');
      this.loading.set(false);
    }
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load script ' + src));
      document.head.appendChild(script);
    });
  }
}
