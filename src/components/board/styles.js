import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('board');

const Wrapper = styled.div`
    display: flex;
    margin: ${({ spacing }) => spacing || '40px 40px 0'};
    background-color: ${getProperty('background')};
    width: auto;
    min-height: 218px;
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 50, 0.1);
    border: solid 1px ${getProperty('borderColor')};;
    
    h1 {
        margin: 0 0 10px 0;
        padding: 0;
        font-size: 24px;
        letter-spacing: 1px;
        color: ${getProperty('headingColor')};
    }
    
    p {
        margin: 0;
        font-size: 14px;
        letter-spacing: .7px;
        color: ${getProperty('textColor')};
    }
`;

const ImageWrapper = styled.div`
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    div {
        width: 100%;
        height: 200px;
    }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 40px 40px 0; 
  flex-grow: 1;
`;

export {
    Wrapper,
    ImageWrapper,
    ContentWrapper
};
