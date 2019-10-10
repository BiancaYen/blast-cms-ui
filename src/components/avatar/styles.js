import styled from 'react-emotion';

// Utils
import getTheme from '../../utils/getTheme';

const getProperty = getTheme('avatar');

const getBorderStyles = property => ({ isActive, withBorder, ...props }) => {
    if (withBorder) {
        return `3px solid ${getProperty(isActive ? 'borderActive' : property)(props)}`;
    }

    return 'none';
};

const AvatarWrapper = styled.div`
    position: relative;
    height: ${({ size }) => (size === 'large' ? '120px' : '40px')};
    width: ${({ size }) => (size === 'large' ? '120px' : '40px')};

    img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: auto;
        border-radius: 50%;
        border: ${getBorderStyles};
    }   
    
    img:hover {
        border: ${getBorderStyles('borderHover')}
    }
`;

export default AvatarWrapper;
