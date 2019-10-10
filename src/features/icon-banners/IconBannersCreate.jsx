import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

// Actions
import { postCreateIconBanner } from '../../redux/actions/icon-banners/createActions';

// Components
import {
    Breadcrumb,
    Button,
    FormWrapperSubmit
} from '../../components';
import CreateEditForm from './CreateEditForm';

// HOC
import withForm from '../../utils/withForm';

// State
const mapStateToProps = ({ iconBanners: { create } }) => {
    const { data, submit, validationSchema } = create;

    return {
        data,
        submit,
        validationSchema
    };
};

// Actions
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        postCreateIconBanner
    },
    dispatch)
});

// Default props
const defaultProps = {
    isValid: false,
    submit: false
};

// Prop types
const propTypes = {
    actions: PropTypes.shape({
        postCreateIconBanner: PropTypes.func.isRequired
    }).isRequired,
    history: PropTypes.instanceOf(Object).isRequired,
    isValid: PropTypes.bool,
    submit: PropTypes.bool,
    touched: PropTypes.instanceOf(Object).isRequired,
    validation: PropTypes.instanceOf(Object).isRequired,
    values: PropTypes.shape({
        bannerName: PropTypes.string.isRequired,
        bannerText: PropTypes.string.isRequired,
        bannerSubtext: PropTypes.string.isRequired,
        bannerCtaTitle: PropTypes.string.isRequired,
        redirectUrl: PropTypes.string.isRequired,
        bannerFile: PropTypes.any.isRequired,
        templates: PropTypes.instanceOf(Array).isRequired
    }).isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};


const IconBannersCreate = ({
    actions,
    history,
    isValid,
    submit,
    touched,
    validation,
    values,
    onBlur,
    onChange,
    onSubmit
}) => {
    const onSubmitActive = (formValues, setErrors) => {
        actions.postCreateIconBanner(
            { ...formValues, active: 1 },
            { setErrors }
        );
    };

    const onSubmitInactive = (formValues, setErrors) => {
        actions.postCreateIconBanner(
            { ...formValues, active: 0 },
            { setErrors }
        );
    };

    const handleCancel = () => {
        history.push('/icon_banners');
    };

    return (
        <React.Fragment>
            <Breadcrumb
                links={[<Link to="/icon_banners">Index</Link>]}
                spacing="0"
                title="Create new Icon Banner"
            />
            <CreateEditForm
                touched={touched}
                validation={validation}
                values={values}
                onBlur={onBlur}
                onChange={onChange}
            />
            <FormWrapperSubmit>
                <Button
                    outlined
                    small
                    spacing="0 auto 0 0"
                    title="Cancel"
                    onClick={handleCancel}
                />
                <Button
                    disabled={!isValid}
                    outlined
                    small
                    spacing="0 40px 0 0"
                    title="Create Inactive"
                    loading={submit}
                    onClick={onSubmit(onSubmitInactive)}
                />
                <Button
                    disabled={!isValid}
                    title="Create And Publish"
                    loading={submit}
                    onClick={onSubmit(onSubmitActive)}
                />
            </FormWrapperSubmit>
        </React.Fragment>
    );
};

IconBannersCreate.defaultProps = defaultProps;
IconBannersCreate.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withForm(IconBannersCreate)));
