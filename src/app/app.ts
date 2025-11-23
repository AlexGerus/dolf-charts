import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploader } from './components/file-uploader/file-uploader.component';
import { ScenarioCard } from './components/scenario-card/scenario-card.component';
import { ScenarioService } from './services/scenario.service';
import { ScenarioData } from './models/scenario.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FileUploader, ScenarioCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Inject service using inject() function
  readonly scenarioService = inject(ScenarioService);

  // Use computed signal for scenarios
  readonly scenarios = this.scenarioService.scenarios;
  readonly scenariosCount = computed(() => this.scenarios().length);

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
}
