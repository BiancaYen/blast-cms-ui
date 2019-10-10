import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Styles
import { LinkWrapper } from './styles';

// Components
import AuthForm from './AuthForm';
import Button from '../../components/buttons/Button';
import Input from '../../components/input/Input';

// Utils
import withForm from '../../utils/withForm';

// Actions
import { checkToken, postLogin, resetErrors } from '../../redux/actions/auth/loginActions';

// State
const mapStateToProps = ({ auth: { login } }) => {
    const {
        data,
        errors,
        submit,
        validationSchema
    } = login;

    return {
        data,
        errors,
        submit,
        validationSchema
    };
};

// Actions
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            checkToken,
            postLogin,
            resetErrors
        },
        dispatch)
    };
};

// Default props
const defaultProps = {
    isValid: false,
    submit: false
};

// Prop types
const propTypes = {
    actions: PropTypes.shape({
        checkToken: PropTypes.func.isRequired,
        postLogin: PropTypes.func.isRequired,
        resetErrors: PropTypes.func.isRequired
    }).isRequired,
    errors: PropTypes.instanceOf(Object).isRequired,
    isValid: PropTypes.bool,
    submit: PropTypes.bool,
    touched: PropTypes.instanceOf(Object).isRequired,
    validation: PropTypes.instanceOf(Object).isRequired,
    values: PropTypes.shape({
        email: PropTypes.string.isRequired
    }).isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const Login = ({
    actions,
    errors,
    isValid,
    submit,
    touched,
    validation,
    values,
    onBlur,
    onChange,
    onSubmit
}) => {
    useEffect(() => {
        actions.checkToken();

        return () => {
            actions.resetErrors();
        };
    }, []);

    const handleSubmit = (data, setErrors) => {
        actions.postLogin(data, { setErrors });
    };

    if (errors.message) {
        return (
            <AuthForm spacingContent="110px 60px 89px 60px">
                <p>{errors.message}</p>
                <Button title="Try again" onClick={() => actions.resetErrors()} />
            </AuthForm>
        );
    }

    return (
        <AuthForm>
            <Input
                id="email"
                label="Email address"
                placeholder="Type Email Address"
                validation={touched.email && validation.email}
                value={values.email}
                onBlur={onBlur}
                onChange={onChange}
            />
            <Input
                id="password"
                label="Password"
                type="password"
                placeholder="Type Password"
                validation={touched.password && validation.password}
                value={values.password}
                onBlur={onBlur}
                onChange={onChange}
            />
            <Button
                type="submit"
                loading={submit}
                title="Sign in"
                disabled={!isValid}
                onClick={onSubmit(handleSubmit)}
            />
            <LinkWrapper>
                <Link
                    to="/recover_password"
                    role="link"
                    tabIndex="0"
                >
                    Forgot Password?
                </Link>
            </LinkWrapper>
        </AuthForm>
    );
};

Login.defaultProps = defaultProps;
Login.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(withForm(Login));
