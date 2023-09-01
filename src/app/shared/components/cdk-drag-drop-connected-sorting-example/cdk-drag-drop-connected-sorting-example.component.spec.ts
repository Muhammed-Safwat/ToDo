import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdkDragDropConnectedSortingExample } from './cdk-drag-drop-connected-sorting-example.component';

describe('CdkDragDropConnectedSortingExampleComponent', () => {
  let component: CdkDragDropConnectedSortingExample;
  let fixture: ComponentFixture<CdkDragDropConnectedSortingExample>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CdkDragDropConnectedSortingExample]
    });
    fixture = TestBed.createComponent(CdkDragDropConnectedSortingExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
