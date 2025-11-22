import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScenarioService } from '../../services/scenario.service';
import { ScenarioData } from '../../models/scenario.model';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderComponent {
  @Output() filesUploaded = new EventEmitter<ScenarioData[]>();

  isDragging = false;
  isLoading = false;
  errorMessage = '';

  constructor(private scenarioService: ScenarioService) {}

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  async handleFiles(files: FileList): Promise<void> {
    this.errorMessage = '';

    // Check file count
    if (files.length > 6) {
      this.errorMessage = 'Maximum 6 files can be uploaded at once';
      return;
    }

    // Check current scenarios count
    const currentCount = this.scenarioService.getScenariosCount();
    if (currentCount + files.length > 6) {
      this.errorMessage = `Can only upload ${6 - currentCount} more scenario(s). Maximum is 6 total.`;
      return;
    }

    this.isLoading = true;

    try {
      const scenarios: ScenarioData[] = [];

      // Process all files
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validate file type
        if (!file.name.endsWith('.json')) {
          throw new Error(`File "${file.name}" is not a JSON file`);
        }

        // Parse file
        try {
          const scenarioData = await this.scenarioService.parseScenarioFile(file);
          scenarios.push(scenarioData);
        } catch (error) {
          throw new Error(`Failed to parse "${file.name}": ${error}`);
        }
      }

      // Add all scenarios to service
      scenarios.forEach(scenario => {
        this.scenarioService.addScenario(scenario);
      });

      this.filesUploaded.emit(scenarios);
    } catch (error: any) {
      this.errorMessage = error.message || 'Failed to upload files';
    } finally {
      this.isLoading = false;
    }
  }

  clearError(): void {
    this.errorMessage = '';
  }
}
