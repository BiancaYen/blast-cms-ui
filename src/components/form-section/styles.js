import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('form');

const getBorderProperty = ({ withoutBorder, ...props }) => {
    if (!withoutBorder) {
        return `solid 2px ${getProperty('borderColor')(props)}`;
    }

    return 'none';
};

const HeadingWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    
    h1 {
        font-size: 14px;
        font-weight: 600;
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.7px;
        
        color: ${getProperty('sectionHeading')};
        
        > * {
            display: flex;
            flex-direction: row;
            
            &> * {
                margin-left: 20px;
            } 
        }
    }
    
    [class*="SectionActionsWrapper"] {
        padding-bottom: 0;
    }
`;

const FormSectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    
    flex: ${({ flex }) => (flex || 1)};
    margin: ${({ spacing }) => spacing || '20px 40px 0 40px'};
    border-top: ${getBorderProperty};
    padding-top: ${({ withoutBorder }) => (withoutBorder ? '0' : '30px')};
`;

export {
    HeadingWrapper,
    FormSectionWrapper
};
