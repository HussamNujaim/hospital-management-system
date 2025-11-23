import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MxTopbarComponent } from './mx-topbar.component';

describe('MxTopbarComponent', () => {
  let component: MxTopbarComponent;
  let fixture: ComponentFixture<MxTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MxTopbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MxTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
