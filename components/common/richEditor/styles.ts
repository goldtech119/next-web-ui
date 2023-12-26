import { styled } from '@mui/material';

export const ToolbarStyles = `
.toolbar {
  .toolbar-item {
    border: 0;
    display: flex;
    background: none;
    border-radius: 10px;
    padding: 8px;
    cursor: pointer;
    vertical-align: middle;
    &:disabled {
      cursor: not-allowed;
    }
    &.spaced {
      margin-right: 2px;
    }
    &.active {
      background-color: rgba(223, 232, 250, 0.3);
    }
  }
  .toolbar-item {
    &:hover {
      &:not([disabled]) {
        background-color: #eee;
      }
    }
    .text {
      display: flex;
      line-height: 20px;
      width: 200px;
      vertical-align: middle;
      font-size: 14px;
      color: #777;
      text-overflow: ellipsis;
      width: 70px;
      overflow: hidden;
      height: 20px;
      text-align: left;
    }
    .icon {
      display: flex;
      width: 20px;
      height: 20px;
      user-select: none;
      margin-right: 8px;
      line-height: 16px;
      background-size: contain;
    }
  }
  .divider {
    width: 1px;
    background-color: #eee;
    margin: 0 4px;
  }
  select {
    &.toolbar-item {
      border: 0;
      display: flex;
      background: none;
      border-radius: 10px;
      padding: 8px;
      vertical-align: middle;
      -webkit-appearance: none;
      -moz-appearance: none;
      width: 70px;
      font-size: 14px;
      color: #777;
      text-overflow: ellipsis;
    }
    &.code-language {
      text-transform: capitalize;
      width: 130px;
    }
  }
  i {
    &.chevron-down {
      margin-top: 3px;
      width: 16px;
      height: 16px;
      display: flex;
      user-select: none;
      &.inside {
        width: 16px;
        height: 16px;
        display: flex;
        margin-left: -25px;
        margin-top: 11px;
        margin-right: 10px;
        pointer-events: none;
      }
    }
  }
}
.block-controls {
  button {
    &:hover {
      background-color: #efefef;
    }
    &:focus-visible {
      border-color: blue;
    }
  }
  span {
    &.block-type {
      background-size: contain;
      display: block;
      width: 18px;
      height: 18px;
      margin: 2px;
      &.paragraph {
        background-image: url(rich-editor/icons/text-paragraph.svg);
      }
      &.h1 {
        background-image: url(rich-editor/icons/type-h1.svg);
      }
      &.h2 {
        background-image: url(rich-editor/icons/type-h2.svg);
      }
      &.quote {
        background-image: url(rich-editor/icons/chat-square-quote.svg);
      }
      &.ul {
        background-image: url(rich-editor/icons/list-ul.svg);
      }
      &.ol {
        background-image: url(rich-editor/icons/list-ol.svg);
      }
      &.code {
        background-image: url(rich-editor/icons/code.svg);
      }
    }
  }
}

.dropdown {
  z-index: 10;
  display: block;
  position: fixed;
  box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  min-height: 40px;
  background-color: #fff;
}

.dropdown .item {
  margin: 0 8px 0 8px;
  padding: 8px;
  color: #050505;
  cursor: pointer;
  line-height: 16px;
  font-size: 15px;
  display: flex;
  align-content: center;
  flex-direction: row;
  flex-shrink: 0;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 8px;
  border: 0;
  max-width: 250px;
  min-width: 100px;
}

.dropdown .item.fontsize-item,
.dropdown .item.fontsize-item .text {
  min-width: unset;
}

.dropdown .item .active {
  display: flex;
  width: 20px;
  height: 20px;
  background-size: contain;
}

.dropdown .item:first-child {
  margin-top: 8px;
}

.dropdown .item:last-child {
  margin-bottom: 8px;
}

.dropdown .item:hover {
  background-color: #eee;
}

.dropdown .item .text {
  display: flex;
  line-height: 20px;
  flex-grow: 1;
  min-width: 150px;
}

.dropdown .item .icon {
  display: flex;
  width: 20px;
  height: 20px;
  user-select: none;
  margin-right: 12px;
  line-height: 16px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.dropdown .divider {
  width: auto;
  background-color: #eee;
  margin: 4px 8px;
  height: 1px;
}

@media screen and (max-width: 1100px) {
  .dropdown-button-text {
    display: none !important;
  }

  .font-size .dropdown-button-text {
    display: flex !important;
  }

  .code-language .dropdown-button-text {
    display: flex !important;
  }
}
`;

export const DebugStyles = `
.debug-timetravel-panel {
  overflow: hidden;
  padding: 0 0 10px 0;
  margin: auto;
  display: flex;
}
.debug-timetravel-panel-slider {
  padding: 0;
  flex: 8;
}
.debug-timetravel-panel-button {
  padding: 0;
  border: 0;
  background: none;
  flex: 1;
  color: #fff;
  font-size: 12px;
  &:hover {
    text-decoration: underline;
  }
}
.debug-timetravel-button {
  border: 0;
  padding: 0;
  font-size: 12px;
  top: 10px;
  right: 15px;
  position: absolute;
  background: none;
  color: #fff;
  &:hover {
    text-decoration: underline;
  }
}
.tree-view-output {
  display: block;
  background: #222;
  color: #fff;
  padding: 5px;
  font-size: 12px;
  white-space: pre-wrap;
  margin: 1px auto 10px auto;
  max-height: 250px;
  position: relative;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: auto;
  line-height: 14px;
}
`;

export const EditorStyles = `
.editor-container {
  margin: 20px auto 20px auto;
  border-radius: 2px;
  max-width: 600px;
  color: #000;
  position: relative;
  line-height: 20px;
  font-weight: 400;
  text-align: left;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.editor-placeholder {
  color: #999;
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  top: 15px;
  left: 10px;
  font-size: 15px;
  user-select: none;
  display: inline-block;
  pointer-events: none;
}
.editor-text-bold {
  font-weight: bold;
}
.editor-text-italic {
  font-style: italic;
}
.editor-text-underline {
  text-decoration: underline;
}
.editor-text-strikethrough {
  text-decoration: line-through;
}
.editor-text-underlineStrikethrough {
  text-decoration: underline line-through;
}
.editor-text-code {
  background-color: rgb(240, 242, 245);
  padding: 1px 0.25rem;
  font-family: Menlo, Consolas, Monaco, monospace;
  font-size: 94%;
}
.editor-link {
  color: rgb(33, 111, 219);
  text-decoration: none;
}
.editor-code {
  background-color: rgb(240, 242, 245);
  font-family: Menlo, Consolas, Monaco, monospace;
  display: block;
  padding: 8px 8px 8px 52px;
  line-height: 1.53;
  font-size: 13px;
  margin: 0;
  margin-top: 8px;
  margin-bottom: 8px;
  tab-size: 2;
  overflow-x: auto;
  position: relative;
  &:before {
    content: attr(data-gutter);
    position: absolute;
    background-color: #eee;
    left: 0;
    top: 0;
    border-right: 1px solid #ccc;
    padding: 8px;
    color: #777;
    white-space: pre-wrap;
    text-align: right;
    min-width: 25px;
  }
  &:after {
    content: attr(data-highlight-language);
    top: 0;
    right: 3px;
    padding: 3px;
    font-size: 10px;
    text-transform: uppercase;
    position: absolute;
    color: rgba(0, 0, 0, 0.5);
  }
}
.editor-tokenComment {
  color: slategray;
}
.editor-tokenPunctuation {
  color: #999;
}
.editor-tokenProperty {
  color: #905;
}
.editor-tokenSelector {
  color: #690;
}
.editor-tokenOperator {
  color: #9a6e3a;
}
.editor-tokenAttr {
  color: #07a;
}
.editor-tokenVariable {
  color: #e90;
}
.editor-tokenFunction {
  color: #dd4a68;
}
.editor-paragraph {
  margin: 0;
  margin-bottom: 8px;
  position: relative;
  &:last-child {
    margin-bottom: 0;
  }
}
.editor-heading-h1 {
  font-size: 24px;
  color: rgb(5, 5, 5);
  font-weight: 400;
  margin: 0;
  margin-bottom: 12px;
  padding: 0;
}
.editor-heading-h2 {
  font-size: 15px;
  color: rgb(101, 103, 107);
  font-weight: 700;
  margin: 0;
  margin-top: 10px;
  padding: 0;
  text-transform: uppercase;
}
.editor-quote {
  margin: 0;
  margin-left: 20px;
  font-size: 15px;
  color: rgb(101, 103, 107);
  border-left-color: rgb(206, 208, 212);
  border-left-width: 4px;
  border-left-style: solid;
  padding-left: 16px;
}
.editor-list-ol {
  padding: 0;
  margin: 0;
  margin-left: 16px;
}
.editor-list-ul {
  padding: 0;
  margin: 0;
  margin-left: 16px;
}
.editor-listitem {
  margin: 8px 32px 8px 32px;
}
.editor-nested-listitem {
  list-style-type: none;
}
pre {
  &::-webkit-scrollbar {
    background: transparent;
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #999;
  }
}
`;

export const MentionsStyles = `
.editor-mention {
  padding: 4px;
  border-radius: 4px;
  background: #333;

  &--role {
    background: lightgreen;
  }

  &--channel {
    background: lightblue;
  }

  &--variable {
    background: pink;
  }

  &--emoji {
    background: lightyellow;
  }
}
`;

export const CompositeStyles = `
.ltr {
  text-align: left;
}
.rtl {
  text-align: right;
}
.emoji {
  color: transparent;
  background-size: 16px 16px;
  background-position: center;
  background-repeat: no-repeat;
  vertical-align: middle;
  margin: 0 -1px;
  &.happysmile {
    background-image: url(rich-editor/emoji/1F642.png);
  }
}
.emoji-inner {
  padding: 0 0.15em;
  &::selection {
    color: transparent;
    background-color: rgba(150, 150, 150, 0.4);
  }
  &::moz-selection {
    color: transparent;
    background-color: rgba(150, 150, 150, 0.4);
  }
}
.link-editor .button i,
.actions i {
  background-size: contain;
  display: inline-block;
  height: 20px;
  width: 20px;
  vertical-align: -0.25em;
}
${EditorStyles}
${ToolbarStyles}
${DebugStyles}
${MentionsStyles}
`;

export const TypeaheadStyles = `
.typeahead-popover {
  background: #fff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  margin-top: 25px;
  width: fit-content;
  min-width: 100px;
  max-width: 300px;
}

.typeahead-popover ul {
  padding: 0;
  list-style: none;
  margin: 0;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: scroll;
}

.typeahead-popover ul::-webkit-scrollbar {
  display: none;
}

.typeahead-popover ul {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.typeahead-popover ul li {
  margin: 0;
  min-width: 180px;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  border-radius: 8px;
}

.typeahead-popover ul li.selected {
  background: #eee;
}

.typeahead-popover li {
  margin: 0 8px 0 8px;
  padding: 8px;
  color: #050505;
  cursor: pointer;
  line-height: 16px;
  font-size: 15px;
  display: flex;
  align-content: center;
  flex-direction: row;
  flex-shrink: 0;
  background-color: #fff;
  border-radius: 8px;
  border: 0;
}

.typeahead-popover li.active {
  display: flex;
  width: 20px;
  height: 20px;
  background-size: contain;
}

.typeahead-popover li:first-child {
  border-radius: 8px 8px 0px 0px;
}

.typeahead-popover li:last-child {
  border-radius: 0px 0px 8px 8px;
}

.typeahead-popover li:hover {
  background-color: #eee;
}

.typeahead-popover li .text {
  display: flex;
  line-height: 20px;
  flex-grow: 1;
  min-width: 150px;
}

.typeahead-popover li .content {
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  align-items: center;
  gap: 8px;
}

.typeahead-popover li .icon {
  display: flex;
  width: 20px;
  height: 20px;
  user-select: none;
  margin-right: 8px;
  line-height: 16px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
`;

export const StyleWrapper = styled('div')`
	${CompositeStyles}
`;
