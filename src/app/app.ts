import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { ScenarioCardComponent } from './components/scenario-card/scenario-card.component';
import { ScenarioService } from './services/scenario.service';
import { ScenarioData } from './models/scenario.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FileUploaderComponent, ScenarioCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  scenarios: ScenarioData[] = [];
  private destroy$ = new Subject<void>();

  constructor(public scenarioService: ScenarioService) {}

  ngOnInit(): void {
    this.scenarioService.scenarios$
      .pipe(takeUntil(this.destroy$))
      .subscribe(scenarios => {
        this.scenarios = scenarios;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFilesUploaded(scenarios: ScenarioData[]): void {
    // Files are already added to the service in the FileUploaderComponent
    console.log(`Uploaded ${scenarios.length} scenario(s)`);
  }

  onRemoveScenario(index: number): void {
    this.scenarioService.removeScenario(index);
  }

  clearAllScenarios(): void {
    this.scenarioService.clearAllScenarios();
  }

  getScenariosCount(): number {
    return this.scenarios.length;
  }
}
