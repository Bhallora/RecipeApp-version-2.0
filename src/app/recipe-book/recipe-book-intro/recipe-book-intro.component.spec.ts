import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeBookIntroComponent } from './recipe-book-intro.component';

describe('RecipeBookIntroComponent', () => {
  let component: RecipeBookIntroComponent;
  let fixture: ComponentFixture<RecipeBookIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeBookIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeBookIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
