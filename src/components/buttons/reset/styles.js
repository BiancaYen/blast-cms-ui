import styled, { css } from 'react-emotion';

// Utils
import getTheme from '../../../utils/getTheme';

const getProperty = getTheme('resetButton');

const ResetButtonWrapper = styled.span`
  text-align: right;
  height: 18px;
  cursor: ${({ isDisabled }) => (isDisabled ? 'normal' : 'pointer')};
  
  svg {
    width: 18px;
    height: 18px;
    
    path:nth-of-type(1) {
      fill: ${({ isDisabled }) => getProperty(isDisabled ? 'backgroundColorDisabled' : 'backgroundColor')};
    }
  }
  
  ${({ isDisabled, label, ...props }) => !isDisabled && css`
    &:hover {
        &> svg {
          display: none;
        }
        &:after {
            content: "${label}";
            display: flex;
            align-items: center;
            height: 18px;
            font-size: 11px;
            font-weight: bold;
            line-height: 18px;
            text-transform: uppercase;
            letter-spacing: 0.7px;
            text-align: right;
            color: ${getProperty('backgroundColor')(props)};
        }
      }
  `}
`;

export default ResetButtonWrapper;
