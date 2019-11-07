import styled from 'react-emotion';

const GridWrapper = styled.div`
    display: grid;
    align-items: ${({ alignItems }) => alignItems || 'center'};
    margin: ${({ spacing }) => spacing || '0'};
    padding: ${({ spacingContent }) => spacingContent || '0'};
    grid-gap: ${({ gridGap }) => gridGap || '0 40px'};
    grid: ${({ grid }) => grid || 'none'};
`;

export default GridWrapper;
