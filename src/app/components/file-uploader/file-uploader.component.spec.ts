import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { instance, mock } from 'ts-mockito';
import { FileUploader } from './file-uploader.component';
import { ScenarioService } from '../../services/scenario.service';
import { ScenarioData } from '../../models/scenario.model';

describe('FileUploader', () => {
  let component: FileUploader;
  let fixture: ComponentFixture<FileUploader>;
  let mockScenarioService: ScenarioService;

  const mockScenarioData: ScenarioData = {
    scenario: 'Test Scenario',
    description: 'Test Description',
    symbol: 'BTC/USDT',
    candles: [{
      timestamp: 1234567890,
      timeFormatted: '10:31',
      price: { open: 100, high: 110, low: 90, close: 105 },
      openInterest: { open: 1000, high: 1100, low: 900, close: 1050 },
      volume: 50000,
      turnover: 11000
    }],
    statistics: {
      totalCandles: 1,
      priceStart: 100,
      priceEnd: 105,
      priceChangePercent: 5,
      oiStart: 1000,
      oiEnd: 1050,
      oiChangePercent: 5,
      volatilityPercent: 2.5,
      avgVolume: 50000,
      minVolume: 50000,
      maxVolume: 50000
    }
  };

  beforeEach(async () => {
    mockScenarioService = mock(ScenarioService);

    await TestBed.configureTestingModule({
      imports: [FileUploader],
      providers: [
        { provide: ScenarioService, useValue: instance(mockScenarioService) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FileUploader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('signals initialization', () => {
    it('should initialize isDragging as false', () => {
      expect(component.isDragging()).toBe(false);
    });

    it('should initialize isLoading as false', () => {
      expect(component.isLoading()).toBe(false);
    });

    it('should initialize errorMessage as empty string', () => {
      expect(component.errorMessage()).toBe('');
    });
  });

  // describe('onDragOver', () => {
  //   it('should set isDragging to true', () => {
  //     const event = new DragEvent('dragover');
  //     const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
  //     const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');
  //
  //     component.onDragOver(event);
  //
  //     expect(component.isDragging()).toBe(true);
  //     expect(preventDefaultSpy).toHaveBeenCalled();
  //     expect(stopPropagationSpy).toHaveBeenCalled();
  //   });
  // });
  //
  // describe('onDragLeave', () => {
  //   it('should set isDragging to false', () => {
  //     component.isDragging.set(true);
  //     const event = new DragEvent('dragleave');
  //
  //     component.onDragLeave(event);
  //
  //     expect(component.isDragging()).toBe(false);
  //   });
  // });
  //
  // describe('onDrop', () => {
  //   it('should set isDragging to false and handle files', async () => {
  //     const file = new File([JSON.stringify(mockScenarioData)], 'test.json', { type: 'application/json' });
  //     const dataTransfer = new DataTransfer();
  //     dataTransfer.items.add(file);
  //
  //     const event = new DragEvent('drop', { dataTransfer });
  //
  //     when(mockScenarioService.getScenariosCount()).thenReturn(0);
  //     when(mockScenarioService.parseScenarioFile(anything())).thenResolve(mockScenarioData);
  //
  //     component.onDrop(event);
  //
  //     expect(component.isDragging()).toBe(false);
  //   });
  // });
  //
  // describe('handleFiles', () => {
  //   it('should reject files exceeding maximum count of 6', async () => {
  //     const files = Array(7).fill(null).map(() =>
  //       new File([JSON.stringify(mockScenarioData)], 'test.json', { type: 'application/json' })
  //     );
  //     const fileList = createFileList(files);
  //
  //     await component.handleFiles(fileList);
  //
  //     expect(component.errorMessage()).toBe('Maximum 6 files can be uploaded at once');
  //   });
  //
  //   it('should reject files when total would exceed 6', async () => {
  //     when(mockScenarioService.getScenariosCount()).thenReturn(5);
  //
  //     const files = Array(2).fill(null).map(() =>
  //       new File([JSON.stringify(mockScenarioData)], 'test.json', { type: 'application/json' })
  //     );
  //     const fileList = createFileList(files);
  //
  //     await component.handleFiles(fileList);
  //
  //     expect(component.errorMessage()).toContain('Can only upload 1 more scenario');
  //   });
  //
  //   it('should reject non-JSON files', async () => {
  //     when(mockScenarioService.getScenariosCount()).thenReturn(0);
  //
  //     const file = new File(['content'], 'test.txt', { type: 'text/plain' });
  //     const fileList = createFileList([file]);
  //
  //     await component.handleFiles(fileList);
  //
  //     expect(component.errorMessage()).toContain('is not a JSON file');
  //   });
  //
  //   it('should set isLoading during file processing', async () => {
  //     when(mockScenarioService.getScenariosCount()).thenReturn(0);
  //     when(mockScenarioService.parseScenarioFile(anything())).thenResolve(mockScenarioData);
  //
  //     const file = new File([JSON.stringify(mockScenarioData)], 'test.json', { type: 'application/json' });
  //     const fileList = createFileList([file]);
  //
  //     const promise = component.handleFiles(fileList);
  //
  //     // Should be loading during processing
  //     expect(component.isLoading()).toBe(true);
  //
  //     await promise;
  //
  //     // Should not be loading after completion
  //     expect(component.isLoading()).toBe(false);
  //   });
  //
  //   it('should add scenarios and emit filesUploaded event', async () => {
  //     when(mockScenarioService.getScenariosCount()).thenReturn(0);
  //     when(mockScenarioService.parseScenarioFile(anything())).thenResolve(mockScenarioData);
  //
  //     const file = new File([JSON.stringify(mockScenarioData)], 'test.json', { type: 'application/json' });
  //     const fileList = createFileList([file]);
  //
  //     const emitSpy = vi.spyOn(component.filesUploaded, 'emit');
  //
  //     await component.handleFiles(fileList);
  //
  //     verify(mockScenarioService.addScenario(anything())).once();
  //     expect(emitSpy).toHaveBeenCalledWith([mockScenarioData]);
  //   });
  //
  //   it('should handle parsing errors', async () => {
  //     when(mockScenarioService.getScenariosCount()).thenReturn(0);
  //     when(mockScenarioService.parseScenarioFile(anything())).thenReject(new Error('Parse error'));
  //
  //     const file = new File(['invalid'], 'test.json', { type: 'application/json' });
  //     const fileList = createFileList([file]);
  //
  //     await component.handleFiles(fileList);
  //
  //     expect(component.errorMessage()).toContain('Failed to parse');
  //     expect(component.isLoading()).toBe(false);
  //   });
  //
  //   it('should clear error message at start', async () => {
  //     component.errorMessage.set('Previous error');
  //     when(mockScenarioService.getScenariosCount()).thenReturn(0);
  //     when(mockScenarioService.parseScenarioFile(anything())).thenResolve(mockScenarioData);
  //
  //     const file = new File([JSON.stringify(mockScenarioData)], 'test.json', { type: 'application/json' });
  //     const fileList = createFileList([file]);
  //
  //     await component.handleFiles(fileList);
  //
  //     expect(component.errorMessage()).toBe('');
  //   });
  // });

  describe('clearError', () => {
    it('should clear error message', () => {
      component.errorMessage.set('Some error');

      component.clearError();

      expect(component.errorMessage()).toBe('');
    });
  });

  // describe('onFileSelect', () => {
  //   it('should call handleFiles with selected files', async () => {
  //     const file = new File([JSON.stringify(mockScenarioData)], 'test.json', { type: 'application/json' });
  //     const fileList = createFileList([file]);
  //
  //     const input = document.createElement('input');
  //     Object.defineProperty(input, 'files', {
  //       value: fileList,
  //       writable: false
  //     });
  //
  //     const event = { target: input } as any;
  //
  //     when(mockScenarioService.getScenariosCount()).thenReturn(0);
  //     when(mockScenarioService.parseScenarioFile(anything())).thenResolve(mockScenarioData);
  //
  //     await component.onFileSelect(event);
  //
  //     // Verify handleFiles was effectively called
  //     expect(component.isLoading()).toBe(false);
  //   });
  // });
});

// Helper function to create FileList
function createFileList(files: File[]): FileList {
  const dataTransfer = new DataTransfer();
  files.forEach(file => dataTransfer.items.add(file));
  return dataTransfer.files;
}
