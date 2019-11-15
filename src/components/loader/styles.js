import styled from 'react-emotion';

const SpinnerLoaderWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    padding: ${({ spacing }) => spacing || ''};
`;

export default SpinnerLoaderWrapper;
