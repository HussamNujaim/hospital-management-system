import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MxButtonComponent } from './mx-button.component';

describe('MxButtonComponent', () => {
  let component: MxButtonComponent;
  let fixture: ComponentFixture<MxButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MxButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MxButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
