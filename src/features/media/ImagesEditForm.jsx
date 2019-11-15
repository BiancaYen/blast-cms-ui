import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import 'react-image-crop/dist/ReactCrop.css';

// Components
import {
    FormSection,
    Grid,
    ImageCropper,
    Input,
    Select
} from '../../components';

// Utils
import objectDeepMatches from '../../utils/objectDeepMatches';
import usePrevious from '../../utils/usePrevious';

// Prop Types
const propTypes = {
    values: PropTypes.instanceOf(Object).isRequired,
    onChange: PropTypes.func.isRequired
};

const ImagesEditForm = ({
    values,
    onChange
}) => {
    // Data & State
    const {
        alternativeName,
        file
    } = values;

    const aspectRatiosData = [
        { id: 1, name: '1 / 1', value: 1 / 1 },
        { id: 2, name: '4 / 3', value: 4 / 3 },
        { id: 3, name: '16 / 9', value: 16 / 9 }
    ];

    const [source, setSource] = useState('');
    const [isBroken, setIsBroken] = useState(false);

    const [cropProperties, setCropProperties] = useState({
        unit: '%',
        width: 50,
        aspect: 16 / 9
    });

    // Previous Props
    const previousFile = usePrevious(file) || {};

    // Helpers
    const getImage = () => {
        if (file.name) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setSource(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Event Handlers
    const handleCropInputChange = ({ id, value: inputValue }) => {
        if (id === 'aspect') {
            const { value: aspectRatioValue } = aspectRatiosData.find(aspectRatio => aspectRatio.id === inputValue) || {};
            setCropProperties(
                { ...cropProperties, [id]: aspectRatioValue }
            );
        } else {
            setCropProperties(
                { ...cropProperties, [id]: inputValue }
            );
        }
    };

    const handleImageError = () => {
        setIsBroken(true);
    };

    // Effects
    useEffect(() => {
        if (!objectDeepMatches(file.name, previousFile.name)) {
            getImage();
        }
    });

    const { id: aspectRatioId } = aspectRatiosData.find(aspectRatio => aspectRatio.value === cropProperties.aspect) || {};

    return (
        <Fragment>
            <Grid alignItems="start" grid={Grid.grid.twoColumns}>
                <FormSection title="Crop your image" spacing="0" withoutBorder>
                    {source && (
                        <ImageCropper
                            id="file"
                            isBroken={isBroken}
                            cropProperties={cropProperties}
                            file={file}
                            source={source}
                            onChange={onChange}
                            onCropChange={updatedCrop => setCropProperties(updatedCrop)}
                            onImageError={handleImageError}
                        />
                    )}
                </FormSection>
                <FormSection title="Meta Data" spacing="0" withoutBorder>
                    {!isBroken && (
                        <Fragment>
                            <Select
                                id="aspect"
                                data={aspectRatiosData}
                                label="Aspect Ratio"
                                placeholder="Select Aspect Ratio"
                                onChange={handleCropInputChange}
                                value={aspectRatioId}
                            />
                            <Input
                                id="width"
                                label="Width"
                                labelNote={`(In ${cropProperties.unit})`}
                                placeholder="Type Width"
                                onChange={handleCropInputChange}
                                value={cropProperties.width}
                            />
                            <Input
                                id="height"
                                isReadOnly={!!cropProperties.width}
                                label="Height"
                                labelNote={`(In ${cropProperties.unit})`}
                                placeholder="Type Height"
                                onChange={handleCropInputChange}
                                value={cropProperties.height || ''}
                            />
                        </Fragment>
                    )}
                    <Input
                        id="alternativeName"
                        label="Alt Text"
                        placeholder="Type Alt Text"
                        onChange={onChange}
                        value={alternativeName}
                    />
                </FormSection>
            </Grid>
        </Fragment>
    );
};

ImagesEditForm.propTypes = propTypes;

export default ImagesEditForm;
