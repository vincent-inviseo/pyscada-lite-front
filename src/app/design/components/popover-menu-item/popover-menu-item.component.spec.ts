import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverMenuItemComponent } from './popover-menu-item.component';

describe('PopoverMenuItemComponent', () => {
  let component: PopoverMenuItemComponent;
  let fixture: ComponentFixture<PopoverMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopoverMenuItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopoverMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
