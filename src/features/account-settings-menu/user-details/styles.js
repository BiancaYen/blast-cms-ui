import styled from 'react-emotion';

// Utils
import getTheme from '../../../utils/getTheme';

const getProperty = getTheme('accountSettingsMenu');

export const UserNameCopy = styled.span`
    padding-left: 10px;
    color: ${getProperty('userNameColor')};
`;

export const OrganisationCopy = styled.span`
    position: relative;
    padding-right: 12px;
    color: ${getProperty('organisationColor')};
    // The divider
    &:after {
        content: '';
        position: absolute;
        right: 0;
        top: 2px;
        display: inline-block;
        width: 1px;
        height: 8px;
        background-color: ${getProperty('userNameColor')};
    }
`;

export const Wrapper = styled.span`
    text-align: right;
    display: table-cell;
    vertical-align: middle;
    width: 100%;
        
    > span {
        display: table-cell;
        vertical-align: middle;
        font-size: 10px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
`;
