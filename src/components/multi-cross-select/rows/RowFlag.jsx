import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { BadgeFlag, RowFlagWrapper } from './styles';

// Components
import Badge from '../../../components/badge/Badge';
import Row from './Row';

// Prop types
const propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    src: PropTypes.string.isRequired
};

const RowFlag = ({ src, id, children, ...props }) => {
    return (
        <Row {...props} id={id}>
            <RowFlagWrapper>
                {children}
                <Badge>{id}</Badge>
                <BadgeFlag><img src={src} alt="flag" /></BadgeFlag>
            </RowFlagWrapper>
        </Row>
    );
};

RowFlag.propTypes = propTypes;
RowFlag.height = 40;


export default RowFlag;
