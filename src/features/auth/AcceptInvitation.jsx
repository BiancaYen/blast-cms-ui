import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { parse } from 'qs';

// Components
import AuthForm from './AuthForm';
import { Button, Input } from '../../components';

// Utils
import withForm from '../../utils/withForm';

// Actions
import {
    postAcceptInvitation,
    resetErrors
} from '../../redux/actions/auth/acceptInvitationActions';

// Actions
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            postAcceptInvitation,
            resetErrors
        },
        dispatch)
    };
};

// State
const mapStateToProps = ({ auth: { acceptInvitation } }) => {
    const {
        data,
        errors,
        submit,
        validationSchema
    } = acceptInvitation;

    return {
        data,
        errors,
        submit,
        validationSchema
    };
};

// Default props
const defaultProps = {
    submit: false,
    isValid: false
};

// Prop types
const propTypes = {
    actions: PropTypes.shape({
        postAcceptInvitation: PropTypes.func.isRequired,
        resetErrors: PropTypes.func.isRequired
    }).isRequired,
    errors: PropTypes.instanceOf(Object).isRequired,
    isValid: PropTypes.bool,
    location: PropTypes.instanceOf(Object).isRequired,
    submit: PropTypes.bool,
    touched: PropTypes.instanceOf(Object).isRequired,
    validation: PropTypes.instanceOf(Object).isRequired,
    values: PropTypes.shape({
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        passwordConfirmation: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired
    }).isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const AcceptInvitation = ({
    actions,
    errors,
    isValid,
    location,
    submit,
    touched,
    validation,
    values,
    onBlur,
    onChange,
    onSubmit
}) => {
    useEffect(() => {
        const search = location.search.startsWith('?') ? location.search.substr(1) : location.search;
        const { email, token } = parse(search);

        if (email && token) {
            onChange({ id: 'token', value: token });
            onChange({ id: 'email', value: email });
        }

        return () => {
            actions.resetErrors();
        };
    }, []);

    const handleSubmit = ({
        email,
        password,
        passwordConfirmation,
        token
    }, setErrors) => {
        actions.postAcceptInvitation({
            email,
            password,
            passwordConfirmation,
            token
        }, { setErrors });
    };

    if (errors.message) {
        return (
            <AuthForm
                heading="Creating Password Failed"
                spacingContent="60px 60px 60px 60px"
            >
                <p>{errors.message}</p>
                <Button
                    onClick={() => actions.resetErrors()}
                    title="Try again"
                />
            </AuthForm>
        );
    }

    return (
        <AuthForm heading="Create New Password" spacingContent="40px 60px 60px 60px">
            <Input
                id="password"
                label="New Password"
                placeholder="Type New Password"
                type="password"
                validation={touched.password && validation.password}
                value={values.password}
                onBlur={onBlur}
                onChange={onChange}
            />
            <Input
                id="passwordConfirmation"
                label="Re-enter New Password"
                placeholder="Re-enter New Password"
                type="password"
                validation={touched.passwordConfirmation && validation.passwordConfirmation}
                value={values.passwordConfirmation}
                onBlur={onBlur}
                onChange={onChange}
            />
            <Button
                disabled={!isValid}
                loading={submit}
                title="Accept Invitation"
                onClick={onSubmit(handleSubmit)}
            />
        </AuthForm>
    );
};

AcceptInvitation.defaultProps = defaultProps;
AcceptInvitation.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withForm(AcceptInvitation)));
