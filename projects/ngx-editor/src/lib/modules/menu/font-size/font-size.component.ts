import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private menuService: MenuService) {}

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
