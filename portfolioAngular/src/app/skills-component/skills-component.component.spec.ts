import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsComponentComponent } from './skills-component.component';

describe('SkillsComponentComponent', () => {
  let component: SkillsComponentComponent;
  let fixture: ComponentFixture<SkillsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
