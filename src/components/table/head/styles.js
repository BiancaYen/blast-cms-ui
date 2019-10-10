import styled from 'react-emotion';

// Utils
import getTheme from '../../../utils/getTheme';

const getProperty = getTheme('table');

export const height = 50;

const TableHeadStyled = styled.thead`
    width: 100%;
    height: ${height}px;
    border-radius: 9px;
    background-color: ${getProperty('headBackground')};
`;

export default TableHeadStyled;
