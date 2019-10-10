import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

// Actions
import { getHeroBanner, postUpdateHeroBanner } from '../../redux/actions/hero-banners/editActions';

// Components
import {
    Breadcrumb,
    Button,
    FormWrapperSubmit,
    Loader
} from '../../components';
import CreateEditForm from './CreateEditForm';

// HOC
import withForm from '../../utils/withForm';

// State
const mapStateToProps = ({ heroBanners: { edit } }) => {
    const {
        data,
        loading,
        submit,
        validationSchema
    } = edit;

    return {
        data,
        loading,
        submit,
        validationSchema
    };
};

// Actions
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        getHeroBanner,
        postUpdateHeroBanner
    },
    dispatch)
});

// Default props
const defaultProps = {
    isValid: false,
    loading: true,
    submit: false
};

// Prop types
const propTypes = {
    actions: PropTypes.shape({
        getHeroBanner: PropTypes.func.isRequired,
        postUpdateHeroBanner: PropTypes.func.isRequired
    }).isRequired,
    data: PropTypes.instanceOf(Object).isRequired,
    history: PropTypes.instanceOf(Object).isRequired,
    isValid: PropTypes.bool,
    loading: PropTypes.bool,
    match: PropTypes.instanceOf(Object).isRequired,
    submit: PropTypes.bool,
    touched: PropTypes.instanceOf(Object).isRequired,
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


const HeroBannersEdit = ({
    actions,
    data,
    history,
    isValid,
    loading,
    match,
    submit,
    touched,
    validation,
    values,
    onBlur,
    onChange,
    onSubmit
}) => {
    const handleEditSubmit = (formValues, setErrors) => {
        actions.postUpdateHeroBanner(match.params.id, formValues, { setErrors });
    };

    const handleCancel = () => {
        history.push('/hero_banners');
    };

    const getData = () => {
        actions.getHeroBanner(match.params.id);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <React.Fragment>
            <Loader loading={loading}>
                <Breadcrumb
                    links={[<Link to="/hero_banners">Index</Link>]}
                    spacing="0"
                    title="Edit"
                    subTitle={`${data.bannerName || ''} (ID: ${data.id || ''})`}
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
                        spacing="0 40px 0 0"
                        title="Update Hero Banner"
                        loading={submit}
                        onClick={onSubmit(handleEditSubmit)}
                    />
                </FormWrapperSubmit>
            </Loader>
        </React.Fragment>
    );
};

HeroBannersEdit.defaultProps = defaultProps;
HeroBannersEdit.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withForm(HeroBannersEdit)));
