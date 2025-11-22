import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScenarioData } from '../../models/scenario.model';
import { StatsGridComponent } from '../stats-grid/stats-grid.component';
import { ChartSectionComponent } from '../chart-section/chart-section.component';

@Component({
  selector: 'app-scenario-card',
  standalone: true,
  imports: [CommonModule, StatsGridComponent, ChartSectionComponent],
  templateUrl: './scenario-card.component.html',
  styleUrls: ['./scenario-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScenarioCardComponent {
  @Input() scenarioData!: ScenarioData;
  @Input() index!: number;
  @Output() removeScenario = new EventEmitter<number>();

  onRemove(): void {
    this.removeScenario.emit(this.index);
  }
}
