import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAction, Model } from 'survey-core';
import { SurveyModule } from 'survey-angular-ui';
// ① pick any theme you like from survey-core/themes
import { LayeredDarkPanelless } from "survey-core/themes";// e.g., ContrastLight, ContrastDark, LayeredDarkPanelless, etc.

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [CommonModule, SurveyModule],
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit {
  loading = signal(true);
  error = signal<string | null>(null);
  result = signal<any>(null);
  surveyModel!: Model;

  ngOnInit() {
    const surveyJson = {
      elements: [
        { name: 'FirstName', title: 'Enter your first name:', type: 'text' },
        { name: 'LastName',  title: 'Enter your last name:',  type: 'text' }
      ]
    };

    const survey = new Model(surveyJson);
    survey.applyTheme(LayeredDarkPanelless);

    const cancelAction: IAction = {
      id: 'sv-cancel',
      title: 'Cancel',
      // Use SurveyJS classes or your CSS framework (Bootstrap shown here)
      css: 'btn btn-secondary',
      // move it to the right; remove if you don’t want this spacing
      innerCss: 'ms-auto',
      action: () => this.cancel()
    };
    survey.addNavigationItem(cancelAction); // ← Form Library API

    this.surveyModel = survey;
    this.loading.set(false);
  }


  cancel(): void {
    // your cancel logic here
    this.result.set(null);
    this.error.set(null);
    try {
      // clear answers & go to first page if applicable
      (this.surveyModel as any)?.clear?.(true, true);
    } catch { /* noop */ }
    console.log('Survey cancelled');
  }
}
