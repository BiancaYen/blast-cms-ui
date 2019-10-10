import React from 'react';

// Utils
import withDocumentTitle from '../../utils/withDocumentTitle';

// Styles
import {
    AuthWrapper,
    FormWrapper,
    GlyphBlur,
    SideImageWrapper
} from './styles';

// Icons
import Glyph from '../../components/icons/Glyph';

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
