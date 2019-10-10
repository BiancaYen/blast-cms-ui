import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

// Styles
import { LinkWrapper } from './styles';

// Components
import AuthForm from './AuthForm';
import { Button, Input } from '../../components';

// Utils
import withForm from '../../utils/withForm';

// Actions
import {
    postRecover,
    resetErrors
} from '../../redux/actions/auth/recoverPasswordActions';

// Actions
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            postRecover,
            resetErrors
        },
        dispatch)
    };
};

// State
const mapStateToProps = ({ auth: { recoverPassword } }) => {
    const {
        data,
        errors,
        submit,
        success,
        validationSchema
    } = recoverPassword;

    return {
        data,
        errors,
        submit,
        success,
        validationSchema
    };
};

// Default props
const defaultProps = {
    submit: false,
    success: false,
    isValid: false
};

// Prop types
const propTypes = {
    actions: PropTypes.shape({
        postRecover: PropTypes.func.isRequired,
        resetErrors: PropTypes.func.isRequired
    }).isRequired,
    errors: PropTypes.instanceOf(Object).isRequired,
    isValid: PropTypes.bool,
    submit: PropTypes.bool,
    success: PropTypes.bool,
    touched: PropTypes.instanceOf(Object).isRequired,
    validation: PropTypes.instanceOf(Object).isRequired,
    values: PropTypes.shape({
        email: PropTypes.string.isRequired
    }).isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const RecoverPassword = ({
    actions,
    errors,
    isValid,
    success,
    submit,
    touched,
    validation,
    values,
    onBlur,
    onChange,
    onSubmit
}) => {
    useEffect(() => () => {
        actions.resetErrors();
    }, []);

    const handleSubmit = ({ email }, setErrors) => {
        actions.postRecover(email, { setErrors });
    };

    if (errors.message) {
        return (
            <AuthForm
                heading="Email not sent"
                spacingContent="60px 60px 89px 60px"
            >
                <p>{errors.message}</p>
                <Button
                    onClick={() => actions.resetErrors()}
                    title="Try again"
                />
            </AuthForm>
        );
    }

    if (success) {
        return (
            <AuthForm heading="Email sent" spacingContent="60px">
                <p>Please check your email to reset your password.</p>
            </AuthForm>
        );
    }

    return (
        <AuthForm heading="Forgot your password?" spacingContent="30px 60px 60px">
            <Input
                id="email"
                label="Email address"
                placeholder="Type Email Address"
                validation={touched.email && validation.email}
                value={values.email}
                spacing="2px 0 10px"
                onBlur={onBlur}
                onChange={onChange}
            />
            <Button
                disabled={!isValid}
                loading={submit}
                title="Reset Password"
                onClick={onSubmit(handleSubmit)}
            />
            <LinkWrapper>
                <Link
                    to="/"
                    role="link"
                    tabIndex="0"
                >
                    Oh, I remembered!
                </Link>
            </LinkWrapper>
        </AuthForm>
    );
};

RecoverPassword.defaultProps = defaultProps;
RecoverPassword.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(withForm(RecoverPassword));
