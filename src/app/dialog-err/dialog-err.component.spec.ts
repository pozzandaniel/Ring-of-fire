import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogErrComponent } from './dialog-err.component';

describe('DialogErrComponent', () => {
  let component: DialogErrComponent;
  let fixture: ComponentFixture<DialogErrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogErrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogErrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
