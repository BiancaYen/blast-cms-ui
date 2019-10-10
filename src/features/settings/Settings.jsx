import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Action Creators
import { getSettings, postUpdateSettings } from '../../redux/actions/settings/settingsEditActions';

// HOC
import withForm from '../../utils/withForm';

// Components
import {
    Breadcrumb,
    Button,
    Form,
    FormRow,
    FormSection,
    FormWrapperSubmit,
    Input,
    Loader
} from '../../components';

// State
const mapStateToProps = ({ settings: { edit } }) => {
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
        getSettings,
        postUpdateSettings
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
        getSettings: PropTypes.func.isRequired,
        postUpdateSettings: PropTypes.func.isRequired
    }).isRequired,
    isValid: PropTypes.bool,
    loading: PropTypes.bool,
    submit: PropTypes.bool,
    touched: PropTypes.instanceOf(Object).isRequired,
    validation: PropTypes.instanceOf(Object).isRequired,
    values: PropTypes.shape({
        campaignId: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired
    }).isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFormReset: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const Settings = ({
    actions,
    isValid,
    loading,
    submit,
    touched,
    validation,
    values,
    onBlur,
    onChange,
    onFormReset,
    onSubmit
}) => {
    useEffect(() => {
        actions.getSettings();
    }, []);

    const onSubmitUpdate = (formValues, setErrors) => {
        actions.postUpdateSettings(formValues, { setErrors });
    };

    const preventFormSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <React.Fragment>
            <Loader loading={loading} />

            <Breadcrumb spacing="0" title="Manage Settings" />

            <Form onSubmit={preventFormSubmit}>
                <FormRow spacing="30px 40px 40px">
                    <FormSection title="Campaign" flex="0 1 50%">
                        <Input
                            disabled={submit}
                            id="campaignId"
                            label="Campaign Id"
                            isLoading={loading}
                            placeholder="Type Campaign Id Value"
                            validation={touched.campaignId && validation.campaignId}
                            value={values.campaignId}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                    </FormSection>
                </FormRow>
            </Form>
            <FormWrapperSubmit>
                <Button
                    outlined
                    disabled={submit || loading}
                    small
                    spacing="0 auto 0 0"
                    title="Cancel"
                    onClick={() => onFormReset()}
                />
                <Button
                    disabled={!isValid || loading}
                    title="Update"
                    loading={submit}
                    onClick={onSubmit(onSubmitUpdate)}
                />
            </FormWrapperSubmit>
        </React.Fragment>
    );
};

Settings.defaultProps = defaultProps;
Settings.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(withForm(Settings));
