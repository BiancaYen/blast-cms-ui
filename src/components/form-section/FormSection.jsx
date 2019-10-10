import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { FormSectionWrapper, HeadingWrapper } from './styles';

// Components
import SectionActions from '../../components/section-actions/SectionActions';

// Utils
import * as ActionPropTypes from '../../utils/actionPropType';

// Default props
const defaultProps = {
    actions: [],
    flex: '',
    spacing: '',
    title: '',
    withoutBorder: false
};

// Prop Types
const propTypes = {
    actions: ActionPropTypes.actionPropType([
        ActionPropTypes.title.isRequired,
        ActionPropTypes.action.isRequired,
        ActionPropTypes.icon
    ]),
    children: PropTypes.node.isRequired,
    flex: PropTypes.string,
    spacing: PropTypes.string,
    title: PropTypes.node,
    withoutBorder: PropTypes.bool
};

const FormSection = ({
    actions,
    children,
    flex,
    spacing,
    title,
    withoutBorder
}) => (
    <FormSectionWrapper spacing={spacing} flex={flex} withoutBorder={withoutBorder}>
        <HeadingWrapper>
            <h1>{title}</h1>
            {!!actions.length &&
                <SectionActions
                    actions={actions}
                    spacing="0 0 0 auto"
                    withoutBorder
                />
            }
        </HeadingWrapper>
        {children}
    </FormSectionWrapper>
);

FormSection.defaultProps = defaultProps;
FormSection.propTypes = propTypes;

export default FormSection;
