import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontSizeComponent } from './font-size.component';
import { MenuService } from '../menu.service';
import Editor from '../../../Editor';

describe('FontSizeComponent', () => {
  let component: FontSizeComponent;
  let fixture: ComponentFixture<FontSizeComponent>;
  let menuService: MenuService;
  let editor: Editor;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FontSizeComponent],
      providers: [MenuService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FontSizeComponent);
    component = fixture.componentInstance;

    menuService = fixture.debugElement.injector.get(MenuService);

    editor = new Editor();
    menuService.editor = editor;

    fixture.detectChanges();
  });

  afterEach(() => {
    editor.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
