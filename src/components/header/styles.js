import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('header');

const Actions = styled.div`
    align-items: center;
    display: flex;
    padding-right: 25px;
    margin-left: auto;
`;

const Wrapper = styled.header`
    align-items: center;
    box-shadow: 0 0 8px 0 rgba(227, 229, 230, 0.78);
    display: flex;
    width: 100%;
    justify-content: space-between;
    position: relative;
    z-index: 2;
    
    color: ${getProperty('color')};
    background: ${getProperty('background')};
    
    h1 {
        flex: 1;
        margin: 0;
        font-size: 17px;
        text-transform: uppercase;
        line-height: 1;
        padding: 32px;
        letter-spacing: 1px;
        font-weight: normal;
    }
`;

export {
    Actions,
    Wrapper
};
