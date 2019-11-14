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

const getPlaceholderColor = ({ isDisabled }) => {
    return isDisabled ? getProperty('placeholderDisabled') : getProperty('placeholder');
};

const getIconColor = ({ isActive }) => getProperty(isActive ? 'iconColorActive' : 'iconColor');

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
`;

export default RichTextEditorWrapper;
