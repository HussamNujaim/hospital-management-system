import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MxSidebarComponent } from './mx-sidebar.component';

describe('MxSidebarComponent', () => {
  let component: MxSidebarComponent;
  let fixture: ComponentFixture<MxSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MxSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MxSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
