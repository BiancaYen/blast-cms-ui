import { Editor, value, RichUtils, getDefaultKeyBinding, convertToRaw } from 'draft-js';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

// Components
import StyleControls from './StyleControls';

// Styles
import { ButtonWrapper, RichTextEditorWrapper } from './styles';

// Default Props
const defaultProps = {
};

// Prop Types
const propTypes = {
};

// Custom overrides for "price" style.
const styleMap = {
    H1: {
        fontSize: '24px'
    },
    H2: {
        fontSize: '18px'
    },
    H3: {
        fontSize: '16px'
    }
};

const RichTextEditor = ({ id, value, validation, onChange }) => {
    // Refs
    const editor = useRef(null);

    const handleChange = (updatedValue) => {
        const selectionState = updatedValue.getSelection();
        const anchorKey = selectionState.getAnchorKey();
        const currentContent = updatedValue.getCurrentContent();
        const currentContentBlock = currentContent.getBlockForKey(anchorKey);
        const start = selectionState.getStartOffset();
        const end = selectionState.getEndOffset();
        const selectedText = currentContentBlock.getText().slice(start, end);

        onChange({
            id,
            value: updatedValue
        });
    };

    const handleKeyCommand = (command, updatedValue) => {
        const newState = RichUtils.handleKeyCommand(updatedValue, command);
        if (newState) {
            handleChange(newState);
            return true;
        }
        return false;
    };

    const mapKeyToEditorCommand = (event) => {
        if (event.keyCode === 9 /* TAB */) {
            const newvalue = RichUtils.onTab(
                event,
                value,
                4, /* maxDepth */
            );
            if (newvalue !== value) {
                handleChange(newvalue);
            }
            return;
        }
        return getDefaultKeyBinding(event);
    };

    // const toggleBlockType = (blockType) => {
    //     handleChange(
    //         RichUtils.toggleBlockType(
    //             value,
    //             blockType
    //         )
    //     );
    // };

    const toggleInlineStyle = (inlineStyle) => {
        handleChange(
            RichUtils.toggleInlineStyle(
                value,
                inlineStyle
            )
        );
    };

    const getBlockStyle = (block) => {
        switch (block.getType()) {
            case 'blockquote': return 'RichEditor-blockquote';
            default: return null;
        }
    };

    // save = () => {
    //     const { onSave } = this.props;

    //     onSave(JSON.stringify(convertToRaw(this.props.value.getCurrentContent())));
    // }

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    // let className = 'RichEditor-editor';
    // const contentState = value.getCurrentContent();
    // if (!contentState.hasText()) {
    //     if (contentState.getBlockMap().first().getType() !== 'unstyled') {
    //         className += ' RichEditor-hidePlaceholder';
    //     }
    // }

    return (
        <RichTextEditorWrapper validation={validation} onClick={() => editor.current.focus()}>
            <header>
                <StyleControls
                    value={value}
                    onToggle={toggleInlineStyle}
                />
            </header>
            <div>
                <Editor
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={value}
                    handleKeyCommand={handleKeyCommand}
                    keyBindingFn={mapKeyToEditorCommand}
                    onChange={handleChange}
                    ref={editor}
                    spellCheck
                />
            </div>
        </RichTextEditorWrapper>
    );
};

RichTextEditor.defaultProps = defaultProps;
RichTextEditor.propTypes = propTypes;

export default RichTextEditor;
