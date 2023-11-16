import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoucementHistoryComponent } from './annoucement-history.component';

describe('AnnoucementHistoryComponent', () => {
  let component: AnnoucementHistoryComponent;
  let fixture: ComponentFixture<AnnoucementHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnoucementHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnoucementHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
