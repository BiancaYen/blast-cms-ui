import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import RichTextEditorWrapper from './styles';

const RichTextEditor = ({ value, validation, onChange }) => (
    <RichTextEditorWrapper validation={validation}>
        <Editor
            editorState={value}
            onEditorStateChange={onChange}
        />
    </RichTextEditorWrapper>
);

export default RichTextEditor;
