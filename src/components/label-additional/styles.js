import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('labelAdditional');

const getColor = ({ isDisabled }) => {
    return getProperty(isDisabled ? 'colorDisabled' : 'color');
};

const LabelAdditionalWrapper = styled.span`
    display: block;
    width: 100%;
    line-height: 16px;
    font-size: 10px;
    letter-spacing: 0.6px;
    
    margin: ${({ spacing }) => spacing || '0'};
    color: ${getColor};
    
    a {
        text-decoration: none;
        padding-left: 4px;
        
        color: ${getProperty('linkColor')};
        &:hover {
            text-decoration: underline;
        }
    }
`;

export default LabelAdditionalWrapper;
