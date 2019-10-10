import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { parse } from 'qs';

// Styles
import { LinkWrapper } from './styles';

// Components
import AuthForm from './AuthForm';
import { Button, Input } from '../../components';

// Utils
import withForm from '../../utils/withForm';

// Actions
import {
    postReset,
    resetErrors
} from '../../redux/actions/auth/resetPasswordActions';

// Actions
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            postReset,
            resetErrors
        },
        dispatch)
    };
};

// State
const mapStateToProps = ({ auth: { resetPassword } }) => {
    const {
        data,
        errors,
        submit,
        validationSchema
    } = resetPassword;

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
        postReset: PropTypes.func.isRequired,
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

const ResetPassword = ({
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
        actions.postReset({
            email,
            password,
            passwordConfirmation,
            token
        }, { setErrors });
    };

    if (errors.message) {
        return (
            <AuthForm
                heading="Reset Password Failed"
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

    return (
        <AuthForm heading="Create New Password" spacingContent="40px 60px 32px 60px">
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
                title="Update Password"
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

ResetPassword.defaultProps = defaultProps;
ResetPassword.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withForm(ResetPassword)));
