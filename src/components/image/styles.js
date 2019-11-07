import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('image');

const ImageWrapper = styled.div`
    background: ${getProperty('background')};
    img {
        display: block;
        width: 100%;
        height: auto;
    }
`;

export default ImageWrapper;
