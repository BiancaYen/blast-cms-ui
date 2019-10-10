import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

// Actions
import { postCreateHeroBanner } from '../../redux/actions/hero-banners/createActions';

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
const mapStateToProps = ({ heroBanners: { create } }) => {
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
        postCreateHeroBanner
    },
    dispatch)
});

// Default props
const defaultProps = {
    submit: false,
    isValid: false
};

// Prop types
const propTypes = {
    actions: PropTypes.shape({
        postCreateHeroBanner: PropTypes.func.isRequired
    }).isRequired,
    history: PropTypes.instanceOf(Object).isRequired,
    submit: PropTypes.bool,
    touched: PropTypes.instanceOf(Object).isRequired,
    isValid: PropTypes.bool,
    validation: PropTypes.instanceOf(Object).isRequired,
    values: PropTypes.shape({
        bannerName: PropTypes.string.isRequired,
        bannerText: PropTypes.string.isRequired,
        bannerCtaTitle: PropTypes.string.isRequired,
        redirectUrl: PropTypes.string.isRequired,
        bannerFile: PropTypes.any.isRequired,
        templates: PropTypes.instanceOf(Array).isRequired
    }).isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};


const HeroBannersCreate = ({
    actions,
    history,
    submit,
    touched,
    isValid,
    validation,
    values,
    onBlur,
    onChange,
    onSubmit
}) => {
    const onSubmitActive = (formValues, setErrors) => {
        actions.postCreateHeroBanner(
            { ...formValues, active: 1 },
            { setErrors }
        );
    };

    const onSubmitInactive = (formValues, setErrors) => {
        actions.postCreateHeroBanner(
            { ...formValues, active: 0 },
            { setErrors }
        );
    };

    const handleCancel = () => {
        history.push('/hero_banners');
    };

    return (
        <React.Fragment>
            <Breadcrumb
                links={[<Link to="/hero_banners">Index</Link>]}
                spacing="0"
                title="Create new hero banner"
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
                    spacing="0 auto 0 0"
                    title="Cancel"
                    onClick={handleCancel}
                />
                <Button
                    disabled={!isValid}
                    loading={submit}
                    outlined
                    spacing="0 40px 0 0"
                    title="Create Inactive"
                    onClick={onSubmit(onSubmitInactive)}
                />
                <Button
                    disabled={!isValid}
                    loading={submit}
                    title="Create And Publish"
                    onClick={onSubmit(onSubmitActive)}
                />
            </FormWrapperSubmit>
        </React.Fragment>
    );
};

HeroBannersCreate.defaultProps = defaultProps;
HeroBannersCreate.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withForm(HeroBannersCreate)));
