import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdkDragDropConnectedSortingExampleComponent } from './cdk-drag-drop-connected-sorting-example.component';

describe('CdkDragDropConnectedSortingExampleComponent', () => {
  let component: CdkDragDropConnectedSortingExampleComponent;
  let fixture: ComponentFixture<CdkDragDropConnectedSortingExampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CdkDragDropConnectedSortingExampleComponent]
    });
    fixture = TestBed.createComponent(CdkDragDropConnectedSortingExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
