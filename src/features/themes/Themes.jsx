import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Action Creators
import { getThemes, postUpdateThemes } from '../../redux/actions/themes/themesEditActions';

// HOC
import withForm from '../../utils/withForm';

// Utils
import imageToBase64 from '../../utils/imageToBase64';

// Styles
import ValidationWrapper from './styles';

// Components
import {
    Breadcrumb,
    Button,
    Form,
    FormRow,
    FormSection,
    FormWrapperSubmit,
    ImagePicker,
    Loader
} from '../../components';
import ColorPicker from '../../components/color-picker/ColorPicker';
import ValidationError from '../../components/validation-error/ValidationError';

// State
const mapStateToProps = ({ themes }) => {
    const {
        data,
        loading,
        submit,
        validationSchema
    } = themes;

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
        getThemes,
        postUpdateThemes
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
        getThemes: PropTypes.func.isRequired,
        postUpdateThemes: PropTypes.func.isRequired
    }).isRequired,
    isValid: PropTypes.bool,
    loading: PropTypes.bool,
    submit: PropTypes.bool,
    touched: PropTypes.instanceOf(Object).isRequired,
    validation: PropTypes.instanceOf(Object).isRequired,
    values: PropTypes.instanceOf(Object).isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFormReset: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const Themes = ({
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
        actions.getThemes();
    }, []);

    const handleSubmitUpdate = (formValues, setErrors) => {
        actions.postUpdateThemes(formValues, { setErrors });
    };

    const handleChangeLogoProxy = async ({ id, value }) => {
        if (typeof value === 'string') {
            onChange({ id, value });
        } else {
            const logoBase64Value = await imageToBase64(value);

            onChange({ id, value: logoBase64Value });
        }
    };

    return (
        <React.Fragment>
            <Loader loading={loading} />

            <Breadcrumb spacing="0" title="Manage Themes" />

            <Form>
                <FormRow spacing="30px 40px 40px">
                    <FormSection title="Color Palette" flex="0 1 50%">
                        <ColorPicker
                            id="primary"
                            isDisabled={submit}
                            isLoading={loading}
                            label="Primary"
                            placeholder="Type Primary Value"
                            validation={touched.primary && validation.primary}
                            value={values.primary}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                        <ColorPicker
                            id="secondary"
                            isDisabled={submit}
                            isLoading={loading}
                            label="Secondary"
                            placeholder="Type Secondary Value"
                            validation={touched.secondary && validation.secondary}
                            value={values.secondary}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                        <ColorPicker
                            id="infobarBackground"
                            isDisabled={submit}
                            isLoading={loading}
                            label="Infobar Background"
                            placeholder="Type Infobar Background Value"
                            validation={touched.infobarBackground && validation.infobarBackground}
                            value={values.infobarBackground}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                        <ColorPicker
                            id="infobarText"
                            isDisabled={submit}
                            isLoading={loading}
                            label="Infobar Text"
                            placeholder="Type Infobar Text Value"
                            validation={touched.infobarText && validation.infobarText}
                            value={values.infobarText}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                        <ColorPicker
                            id="topbarBackground"
                            isDisabled={submit}
                            isLoading={loading}
                            label="Topbar Background"
                            placeholder="Type Topbar Background Value"
                            validation={touched.topbarBackground && validation.topbarBackground}
                            value={values.topbarBackground}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                        <ColorPicker
                            id="bodyBackground"
                            isDisabled={submit}
                            isLoading={loading}
                            label="Body Background"
                            placeholder="Type Body Background Value"
                            validation={touched.bodyBackground && validation.bodyBackground}
                            value={values.bodyBackground}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                        <ColorPicker
                            id="bodyText"
                            isDisabled={submit}
                            isLoading={loading}
                            label="Body Text"
                            placeholder="Type Body Text Value"
                            validation={touched.bodyText && validation.bodyText}
                            value={values.bodyText}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                        <ColorPicker
                            id="footerText"
                            isDisabled={submit}
                            isLoading={loading}
                            label="Footer Text"
                            placeholder="Type Footer Text Value"
                            validation={touched.footerText && validation.footerText}
                            value={values.footerText}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                        <ColorPicker
                            id="footerBackground"
                            isDisabled={submit}
                            isLoading={loading}
                            label="Footer Background"
                            placeholder="Type Footer Background Value"
                            validation={touched.footerBackground && validation.footerBackground}
                            value={values.footerBackground}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                    </FormSection>
                    <FormSection title="Logo" flex="0 1 50%">
                        <ColorPicker
                            id="logoBackground"
                            isDisabled={submit}
                            isLoading={loading}
                            label="Logo Background"
                            placeholder="Type Logo Background Value"
                            validation={touched.logoBackground && validation.logoBackground}
                            value={values.logoBackground}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                        <ImagePicker
                            label="Logo"
                            labelNote="(Applies to both Header and Footer)"
                            id="logoFile"
                            maxWidth={100}
                            maxHeight={40}
                            src={values.logoFile}
                            size={10}
                            onChange={handleChangeLogoProxy}
                        />
                        <ValidationWrapper>
                            {validation.logoFile && <ValidationError>{validation.logoFile.error}</ValidationError>}
                        </ValidationWrapper>
                    </FormSection>
                </FormRow>
                <FormWrapperSubmit>
                    <Button
                        outlined
                        disabled={submit || loading}
                        small
                        type="button"
                        spacing="0 auto 0 0"
                        title="Cancel"
                        onClick={() => onFormReset()}
                    />
                    <Button
                        disabled={!isValid || loading}
                        title="Update"
                        type="button"
                        loading={submit}
                        onClick={onSubmit(handleSubmitUpdate)}
                    />
                </FormWrapperSubmit>
            </Form>
        </React.Fragment>
    );
};

Themes.defaultProps = defaultProps;
Themes.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(withForm(Themes));
