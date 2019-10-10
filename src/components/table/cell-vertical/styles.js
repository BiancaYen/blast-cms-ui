import styled from 'react-emotion';

// Styles
import Cell from '../cell/styles';

const CellVerticalWrapper = styled(Cell)`
   &> div {
      display: flex;
      flex-direction: column;
      
      & > * {
          padding: 6px 0;
      }
   }
`;

export default CellVerticalWrapper;
