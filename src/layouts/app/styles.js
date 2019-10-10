import styled from 'react-emotion';
import { injectGlobal } from 'emotion';

// Utils
import getTheme from '../../utils/getTheme';

injectGlobal([`
    * {
      box-sizing: border-box;
      font-family: opensans-semibold, HelveticaNeue Bold, Helvetica Neue, Helvetica, Arial, sans-serif;;
    }
    
    html, body {
      margin: 0;
      height: 100%;
    
        > div {
          &:first-of-type {
            height: 100%;
          }
        }
    }
    
    #root {
        > div {
          height: 100%;
        }
    }
`]);

const getProperty = getTheme('layout');

const Container = styled.div`
    display: table;
    height: 100%;
    margin: 0 auto;
    width: 100%;
    overflow: hidden;
`;

const Content = styled.div`
    background: ${getProperty('background')};
    display: table-cell;
    height: 100%;
    padding-left: 200px;
    padding-bottom: 32px;
`;


export {
    Container,
    Content
};
