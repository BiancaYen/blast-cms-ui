import React from 'react';
import PropTypes from 'prop-types';

const localStorageItemKey = 'table';

// Reset table state when page reloading
window.onload = () => localStorage.setItem(localStorageItemKey, '');

// PropTypes
const propTypes = {
    id: PropTypes.string.isRequired
};

const withSaveState = (ComposedComponent) => {
    const SaveState = ({ id, ...props }) => {
        const savedState = () => {
            const savedData = localStorage[localStorageItemKey];

            return savedData ? JSON.parse(savedData) : {};
        };

        const saveState = (key, data) => {
            const savedData = savedState();

            const newData = {
                ...savedData,
                [id]: {
                    ...savedData[id],
                    [key]: data
                }
            };

            localStorage.setItem(localStorageItemKey, JSON.stringify(newData));
        };
        return (
            <ComposedComponent
                {...props}
                id={id}
                saveState={saveState}
                savedState={savedState()[id] || {}}
            />
        );
    };

    SaveState.propTypes = propTypes;

    return SaveState;
};

withSaveState.propTypes = propTypes;

export default withSaveState;
