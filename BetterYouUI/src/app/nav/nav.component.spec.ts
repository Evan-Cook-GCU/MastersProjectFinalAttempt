import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { path: '' }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  

  it('should render the application name', () => {
    // Arrange
    const appName = fixture.debugElement.query(By.css('#application h1'));

    // Assert
    expect(appName.nativeElement.textContent).toContain('APPLICATION NAME')
  });

  it('should render a search bar', () => {
    // Arrange
    const searchBarDiv = fixture.debugElement.query(By.css('#searchbar'));

    const searchBar = searchBarDiv.query(By.css('[type="text"]'));
    // Assert
    expect(searchBar).toBeTruthy();
  });

  describe('Navbar', () => {
    function getNavbar(): DebugElement {
      return fixture.debugElement.query(By.css('#mainNav'));
    }

    it('should render the navbar', () => {
      // Arrange
      const navbar = getNavbar();

      // Assert
      expect(navbar).toBeTruthy();
    });

    it('should have a link for Documentation', () => {
      // Arrange
      const navbar = getNavbar();

      const documentation = navbar.query(By.css('#documentation'));

      // Assert
      expect(documentation.nativeElement.textContent).toEqual('Documentation');
    });

    it('should have a link for error examples', () => {
      // Arrange
      const navbar = getNavbar();

      const errorExample = navbar.query(By.css('#error-example'));

      // Assert
      expect(errorExample.nativeElement.textContent).toEqual('Error Example')
    });

    it('should have a link for table examples', () => {
      // Arrange
      const navbar = getNavbar();

      const tableExample = navbar.query(By.css('#table-examples'));

      // Assert
      expect(tableExample.nativeElement.textContent).toEqual('Table Examples')
    });

    describe('admin dropdown', () => {
      class MockAuthService {
        authorizedAppFunctions$ = of(['admin/user', 'admin/app-function-group/edit']);
      }

      let service: MockAuthService;

      it('should exist', () => {
        // Arrange
        const navbar = getNavbar();

        const adminDropdown = navbar.query(By.css('#dropdown-menu-link'));

        // Assert
        expect(adminDropdown).toBeTruthy();
      });
    })
  })
});
