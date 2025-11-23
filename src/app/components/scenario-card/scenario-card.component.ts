import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScenarioData } from '../../models/scenario.model';
import { StatsGrid } from '../stats-grid/stats-grid.component';
import { ChartSection } from '../chart-section/chart-section.component';

@Component({
  selector: 'app-scenario-card',
  standalone: true,
  imports: [CommonModule, StatsGrid, ChartSection],
  templateUrl: './scenario-card.component.html',
  styleUrls: ['./scenario-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScenarioCard {
  // Use input() instead of @Input()
  readonly scenarioData = input.required<ScenarioData>();
  readonly index = input.required<number>();

  // Use output() instead of @Output()
  readonly removeScenario = output<number>();

  onRemove(): void {
    this.removeScenario.emit(this.index());
  }
}
