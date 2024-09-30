import Mark from './Mark';
import Blockquote from './Blockquote';
import HorizontalRule from './HorizontalRule';
import ListItem from './ListItem';
import Heading from './Heading';
import TextAlign from './TextAlign';
import Link from './Link';
import Image from './Image';
import TextColor from './TextColor';
import FormatClear from './FormatClear';
import Indent from './Indent';
import History from './History';
import FontSize from './FontSize';

export const STRONG = new Mark('strong');
export const EM = new Mark('em');
export const CODE = new Mark('code');
export const UNDERLINE = new Mark('u');
export const STRIKE = new Mark('s');
export const BLOCKQUOTE = new Blockquote();
export const HORIZONTAL_RULE = new HorizontalRule();
export const FORMAT_CLEAR = new FormatClear();
export const UL = new ListItem(true);
export const OL = new ListItem(false);
export const H1 = new Heading(1);
export const H2 = new Heading(2);
export const H3 = new Heading(3);
export const H4 = new Heading(4);
export const H5 = new Heading(5);
export const H6 = new Heading(6);
export const ALIGN_LEFT = new TextAlign('left');
export const ALIGN_CENTER = new TextAlign('center');
export const ALIGN_RIGHT = new TextAlign('right');
export const ALIGN_JUSTIFY = new TextAlign('justify');
export const LINK = new Link();
export const IMAGE = new Image();
export const TEXT_COLOR = new TextColor('text_color', 'color');
export const TEXT_BACKGROUND_COLOR = new TextColor(
  'text_background_color',
  'backgroundColor',
);
export const FONT_SIZE = new FontSize();
export const INDENT = new Indent('increase');
export const OUTDENT = new Indent('decrease');
export const SUPERSCRIPT = new Mark('sup');
export const SUBSCRIPT = new Mark('sub');
export const UNDO = new History('undo');
export const REDO = new History('redo');
