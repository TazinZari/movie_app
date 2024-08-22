import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PrimeNGConfig, FilterMatchMode } from 'primeng/api';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let primengConfig: PrimeNGConfig;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppComponent, NavBarComponent],
      providers: [PrimeNGConfig],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    primengConfig = TestBed.inject(PrimeNGConfig);
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should have title as "movie-listing"', () => {
    expect(component.title).toEqual('movie-listing');
  });

  it('should configure PrimeNG settings in ngOnInit', () => {
    component.ngOnInit();
    expect(primengConfig.ripple).toBeTrue();
    expect(primengConfig.zIndex).toEqual({
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100,
    });
    expect(primengConfig.filterMatchModeOptions.text).toEqual([
      FilterMatchMode.STARTS_WITH,
      FilterMatchMode.CONTAINS,
      FilterMatchMode.NOT_CONTAINS,
      FilterMatchMode.ENDS_WITH,
      FilterMatchMode.EQUALS,
      FilterMatchMode.NOT_EQUALS,
    ]);
    expect(primengConfig.filterMatchModeOptions.numeric).toEqual([
      FilterMatchMode.EQUALS,
      FilterMatchMode.NOT_EQUALS,
      FilterMatchMode.LESS_THAN,
      FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
      FilterMatchMode.GREATER_THAN,
      FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
    ]);
    expect(primengConfig.filterMatchModeOptions.date).toEqual([
      FilterMatchMode.DATE_IS,
      FilterMatchMode.DATE_IS_NOT,
      FilterMatchMode.DATE_BEFORE,
      FilterMatchMode.DATE_AFTER,
    ]);
  });
});
