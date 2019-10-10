import React from 'react';
import PropTypes from 'prop-types';

// Components
import {
    Checkbox,
    Form,
    FormRow,
    FormSection,
    ImagePicker,
    Input,
    Label,
    TextArea
} from '../../components';

// Utils
import handleTemplatesChange from '../hero-banners/handleTemplatesChange';

// Icons
import IconBannerPlaceholder from '../../components/icons/IconBannerPlaceholder';
import CampaignIdData from '../campaing-id-data/CampaignIdData';

// Prop types
const propTypes = {
    touched: PropTypes.instanceOf(Object).isRequired,
    validation: PropTypes.instanceOf(Object).isRequired,
    values: PropTypes.instanceOf(Object).isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

const CreateEditForm = ({
    touched,
    validation,
    values,
    onBlur,
    onChange
}) => (
    <Form>
        <FormRow spacing="30px 40px 40px">
            <FormSection title="General information">
                <Input
                    onChange={onChange}
                    id="bannerName"
                    placeholder="Type Banner Name"
                    label="Banner Name"
                    onBlur={onBlur}
                    validation={touched.bannerName && validation.bannerName}
                    value={values.bannerName}
                />
                <TextArea
                    onChange={onChange}
                    id="bannerText"
                    rows={5}
                    placeholder="Type Banner Text"
                    label="Banner Text"
                    onBlur={onBlur}
                    validation={touched.bannerText && validation.bannerText}
                    value={values.bannerText}
                />
                <TextArea
                    onChange={onChange}
                    id="bannerSubtext"
                    rows={5}
                    placeholder="Type Banner  Subtext"
                    label="Banner Subtext"
                    onBlur={onBlur}
                    validation={touched.bannerSubtext && validation.bannerSubtext}
                    value={values.bannerSubtext}
                />
                <Input
                    onChange={onChange}
                    id="bannerCtaTitle"
                    placeholder="Type Banner CTA Title"
                    label="Banner CTA Title"
                    onBlur={onBlur}
                    validation={touched.bannerCtaTitle && validation.bannerCtaTitle}
                    value={values.bannerCtaTitle}
                />
                <Input
                    onChange={onChange}
                    id="redirectUrl"
                    placeholder="Type Banner Redirect URL"
                    label="Banner Redirect URL"
                    onBlur={onBlur}
                    validation={touched.redirectUrl && validation.redirectUrl}
                    value={values.redirectUrl}
                />
                <CampaignIdData />
            </FormSection>
            <FormSection title="Banner Management">
                <ImagePicker
                    label="hero banner"
                    id="bannerFile"
                    onChange={onChange}
                    maxWidth={170}
                    maxHeight={170}
                    placeholderImage={<IconBannerPlaceholder />}
                    width="292px"
                    src={values.bannerFile}
                    size={100}
                />
                <Label labelNote="(optional)" spacing="30px 0 0">Template</Label>
                <Checkbox
                    id="editorial"
                    onChange={handleTemplatesChange(2, values.templates, onChange)}
                    value={values.templates.includes(2)}
                    label="Editorial"
                    spacing="16px 0 0"
                />
                <Checkbox
                    id="base"
                    onChange={handleTemplatesChange(1, values.templates, onChange)}
                    value={values.templates.includes(1)}
                    label="Base"
                    spacing="16px 0 0"
                />
            </FormSection>
        </FormRow>
    </Form>
);

CreateEditForm.propTypes = propTypes;

export default CreateEditForm;
