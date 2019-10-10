import styled from 'react-emotion';

const Cell = styled.div`
    flex: ${({ flex }) => (flex)};
    padding: 0 10px;
    
    &:first-child {
        padding-left: 0;
    }
    
    &:last-child {
        padding-right: 0;
    }

    > div {
        position: relative;
    }
`;

export default Cell;
