import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarComponent } from './nav-bar.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarComponent, TabMenuModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: of({}) },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize items and activeItem on ngOnInit', () => {
    component.ngOnInit();
    expect(component.items.length).toBe(1);
    expect(component.items[0].label).toBe('Home');
    expect(component.items[0].routerLink).toBe('/home');
    expect(component.activeItem).toBe(component.items[0]);
  });
});
