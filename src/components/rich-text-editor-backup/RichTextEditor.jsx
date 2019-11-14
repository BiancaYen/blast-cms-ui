import { RichUtils, getDefaultKeyBinding } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createLinkPlugin from 'draft-js-anchor-plugin';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import { ItalicButton, BoldButton, UnderlineButton } from 'draft-js-buttons';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

// Components
// import Toolbar from './Toolbar';

// Styles
import { RichTextEditorWrapper } from './styles';

const linkPlugin = createLinkPlugin();
const LinkButton = linkPlugin.LinkButton;
const toolbarPlugin = createToolbarPlugin();

const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin, linkPlugin];


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
            <div>
                <Editor
                    editorState={value}
                    onChange={handleChange}
                    plugins={plugins}
                    ref={editor}
                    spellCheck
                />
            </div>
            {/* A current bug with the implementation of the toolbar plugins requires that the toolbar be added below the editor */}
            <header>
                <Toolbar>
                    {
                        // may be use React.Fragment instead of div to improve perfomance after React 16
                        (externalProps) => (
                        <div>
                            <BoldButton {...externalProps} />
                            <ItalicButton {...externalProps} />
                            <UnderlineButton {...externalProps} />
                            <LinkButton {...externalProps} />
                        </div>
                        )
                    }
                </Toolbar>
            </header>
        </RichTextEditorWrapper>
    );
};

RichTextEditor.defaultProps = defaultProps;
RichTextEditor.propTypes = propTypes;

export default RichTextEditor;
