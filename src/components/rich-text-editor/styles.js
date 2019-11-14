import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('richTextEditor');

const getBorderProperty = ({ isDisabled, validation }) => {
    if (!isDisabled && validation.status) {
        if (validation.status === 'valid') {
            return getTheme('successColor');
        }

        return getTheme('errorColor');
    }
    return getProperty('border');
};

const getBackgroundProperty = ({ isReadOnly }) => {
    return getProperty(isReadOnly ? 'backgroundReadOnly' : 'background');
};

const RichTextEditorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    background: ${getBackgroundProperty};
    border: 2px solid ${getBorderProperty};
    border-radius: 5px;
    color: ${getProperty('color')};
    cursor: text;
    font-size: 13px;
    letter-spacing: 0.7px;

    .rdw-editor-main {
        min-height: 400px;
        padding: 0 10px;
    }

    .rdw-editor-toolbar {
        border: none;
        border-radius: 5px;
    }

    .rdw-option-wrapper {
        border: none;
    }

    .rdw-dropdown-wrapper {
        border: none;
    }

    .rdw-option-wrapper:hover {
        box-shadow: none;
    }

    .rdw-dropdown-wrapper:hover {
        box-shadow: none;
    }
`;

export default RichTextEditorWrapper;
