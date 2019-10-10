import styled from 'react-emotion';

import Cell from '../table/cell/styles';

const Wrapper = styled(Cell)`
  padding: 10px 0;
  
  &> div {
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    
    &> img {
      width: 100%;
      height: 100%;
    }
  }
`;

export default Wrapper;
