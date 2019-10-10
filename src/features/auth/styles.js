import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('auth');

const AuthFormWrapper = styled.div`
    width: 400px;
    height: 383px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-radius: 5px;
    background: ${getProperty('formBackground')};
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.3);
    padding: ${({ spacingContent }) => (spacingContent || '40px 60px 60px')};
    
    & > button {
        margin-top: auto;
    }
    
    & > p {
        margin: 20px 0;
        font-size: 11px;
        line-height: 1.82;
        letter-spacing: 0.7px;
        white-space: pre-line;
        color: ${getProperty('formInfoColor')};;
    }
`;

const AuthFormHeading = styled.span`
    font-size: 14px;
    font-weight: 600;
    width: 100%;
    text-transform: uppercase;
    margin-bottom: 10px;
    letter-spacing: 0.7px;
    color:  ${getProperty('formHeadingColor')};;
`;

const LinkWrapper = styled.div`
    text-align: center;
    margin-top: 10px;

    a {
        padding: 5px;
        font-size: 10px;
        font-weight: 300;
        text-align: center;
        text-decoration: none;
        outline: none;
        color: ${getProperty('formLinkColor')};
    }
    
    a:hover {
        cursor: pointer;
        color: ${getProperty('formLinkColorHover')};
    }
`;

export {
    AuthFormHeading,
    AuthFormWrapper,
    LinkWrapper
};
