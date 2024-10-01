import type { Command, EditorState } from 'prosemirror-state';
import { Dispatch } from './types';
import { MarkType } from 'prosemirror-model';

import { applyMark } from '@davidbbddeveloper/ngx-editor/commands';
import {
  getSelectionMarks,
  isMarkActive,
} from '@davidbbddeveloper/ngx-editor/helpers';

const FONT_SIZE = 'font_size';
const FONT_SIZE_ATTR = 'size';
const DEFAULT_SIZE = 16;

class FontSize {
  apply(size: number): Command {
    const attrs = { size: `${size}px` };
    return (state: EditorState, dispatch?: Dispatch): boolean => {
      const { schema, selection, doc } = state;

      const type: MarkType = schema.marks[FONT_SIZE];
      if (!type) {
        return false;
      }

      const { from, to, empty } = selection;

      if (!empty && from + 1 === to) {
        const node = doc.nodeAt(from);
        if (node?.isAtom && !node.isText && node.isLeaf) {
          // An atomic node (e.g. Image) is selected.
          return false;
        }
      }

      return applyMark(type, attrs)(state, dispatch);
    };
  }

  isActive(state: EditorState): boolean {
    const { schema } = state;
    const type: MarkType = schema.marks[FONT_SIZE];

    if (!type) {
      return false;
    }

    return isMarkActive(state, type);
  }

  getActiveSize(state: EditorState): number {
    if (!this.isActive(state)) {
      return DEFAULT_SIZE;
    }

    const { schema } = state;
    const marks = getSelectionMarks(state);

    const sizes = marks
      .filter((mark) => mark.type === schema.marks[FONT_SIZE])
      .map((mark) => {
        return mark.attrs[FONT_SIZE_ATTR] as string;
      });

    if (sizes.length === 0) {
      return DEFAULT_SIZE;
    } else if (sizes.length === 1) {
      const index = 0;
      const size = sizes[index];
      const sizeNumberString = size.replace('px', '');
      const sizeNumber = Number(sizeNumberString);
      return sizeNumber;
    }

    return 0;
  }
}

export default FontSize;
