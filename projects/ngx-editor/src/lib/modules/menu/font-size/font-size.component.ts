import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { EditorView } from 'prosemirror-view';
import { Subscription } from 'rxjs';
import { MenuService } from '../menu.service';
import { FontSize } from '../MenuCommands';

@Component({
  selector: 'ngx-font-size',
  templateUrl: './font-size.component.html',
  styleUrl: './font-size.component.scss',
})
export class FontSizeComponent implements OnInit, OnDestroy {
  editorView: EditorView;
  private updateSubscription: Subscription;

  lastSize = 16;
  size = 16;

  isDropdownOpen = false;
  defaultFontSizes = [
    8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64,
  ];

  constructor(
    private menuService: MenuService,
    private el: ElementRef,
  ) {}

  applySize() {
    if (this.size < 1 || this.size > 999) {
      this.size = this.lastSize;
      return;
    }

    const { state, dispatch } = this.editorView;

    FontSize.apply(this.size)(state, dispatch);

    if (!this.editorView.hasFocus()) {
      this.editorView.focus();
    }
  }

  saveLastValue() {
    this.lastSize = this.size;
  }

  resetSize() {
    this.size = this.lastSize;

    if (!this.editorView.hasFocus()) {
      this.editorView.focus();
    }
  }

  onValueChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const size = Number(inputElement.value);
    this.size = size;
  }

  private update(view: EditorView) {
    const { state } = view;

    const isActive = FontSize.isActive(state);
    if (isActive) {
      this.size = FontSize.getActiveSize(state);
    } else {
      this.size = 16;
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:mousedown', ['$event.target']) onDocumentClick(
    target: Node,
  ): void {
    if (!this.el.nativeElement.contains(target) && this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }

  selectSize(s: number) {
    this.size = s;
    this.applySize();
    this.toggleDropdown();
  }

  ngOnInit() {
    this.editorView = this.menuService.editor.view;
    this.updateSubscription = this.menuService.editor.update.subscribe(
      (view: EditorView) => {
        this.update(view);
      },
    );
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }
}
