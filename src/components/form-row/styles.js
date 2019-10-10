import styled from 'react-emotion';

const Row = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: ${({ spacing }) => (spacing || '0')};
`;

export default Row;
