import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('form');

const FormSubmitWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
    
    padding: ${({ spacingContent }) => spacingContent || '40px'};
    margin: ${({ spacing }) => spacing || '30px 0 0 0'};
    border-top: solid 2px ${getProperty('wrapperSubmitBorder')};
    
    button {
        width: 206px;
    }
`;

export default FormSubmitWrapper;
