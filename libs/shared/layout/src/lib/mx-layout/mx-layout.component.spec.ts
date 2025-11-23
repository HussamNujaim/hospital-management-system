import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MxLayout } from './mx-layout.component';

describe('Layout', () => {
  let component: MxLayout;
  let fixture: ComponentFixture<MxLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MxLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(MxLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
