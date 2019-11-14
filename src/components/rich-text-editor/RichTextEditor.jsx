import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import RichTextEditorWrapper from './styles';

const RichTextEditor = ({ id, value, validation, onChange }) => {
    const handleChange = (updatedValue) => {
        onChange({
            id,
            value: updatedValue
        });
    };

    return (
        <RichTextEditorWrapper validation={validation}>
            <Editor
                editorState={value}
                onEditorStateChange={handleChange}
            />
        </RichTextEditorWrapper>
    );
};

export default RichTextEditor;
