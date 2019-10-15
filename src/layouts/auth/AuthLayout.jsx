import React from 'react';

// Utils
import withDocumentTitle from '../../utils/withDocumentTitle';

// Styles
import {
    AuthWrapper,
    FormWrapper
} from './styles';

export default (ComposedComponent) => {
    const AuthLayout = (props) => {
        return (
            <AuthWrapper>
                <FormWrapper>
                    {ComposedComponent && <ComposedComponent {...props} />}
                </FormWrapper>
            </AuthWrapper>
        );
    };

    return withDocumentTitle(AuthLayout);
};
