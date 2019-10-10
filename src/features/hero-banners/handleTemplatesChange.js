const handleTemplateChange = (templateId, templates, handleChange) => ({ value }) => {
    if (value) {
        handleChange({
            id: 'templates',
            value: [...templates, templateId]
        });
    } else {
        handleChange({
            id: 'templates',
            value: templates.filter(item => item !== templateId)
        });
    }
};

export default handleTemplateChange;
