function loadingToggleFalse(state) {
    return {
        ...state,
        loading: false
    };
}

function loadingToggleTrue(state) {
    return {
        ...state,
        loading: true
    };
}

function submitToggleFalse(state) {
    return {
        ...state,
        submit: false
    };
}

function submitToggleTrue(state) {
    return {
        ...state,
        submit: true
    };
}

// Data
function dataUpdateProperty(state, action) {
    return {
        ...state,
        data: {
            ...state.data,
            [action.payload.property]: action.payload.value
        }
    };
}

function dataUpdateArray(state, action) {
    const property = action.payload.property;
    const element = action.payload.element;

    if (typeof property === 'undefined' && typeof property !== 'string') {
        throw new Error('Expected "property" to be a string.');
    }

    if (typeof element === 'undefined' && typeof element !== 'object') {
        throw new Error('Expected "element" to be a object.');
    }

    if (typeof element.id === 'undefined') {
        throw new Error('Expected "element" to have an key "id"');
    }

    let valueArray = [...state.data[property]];

    // If the array is empty or the id is not already in the list, add new element, otherwise update existing
    if (state.data[property].length === 0 || state.data[property].every(item => element.id !== item.id)) {
        valueArray = [...state.data[property], element];
    } else if (state.data[property].find(item => element.id === item.id)) {
        valueArray = state.data[action.payload.property].map((item) => {
            if (item.id === action.payload.element.id) {
                return action.payload.element;
            }
            return item;
        });
    }

    return {
        ...state,
        data: {
            ...state.data,
            [property]: valueArray
        }
    };
}

function dataUpdatArrayRemoveElement(state, action) {
    const valueArray = state.data[action.payload.property].filter((item) => {
        return item.id !== action.payload.id;
    });

    return {
        ...state,
        data: {
            ...state.data,
            [action.payload.property]: valueArray
        }
    };
}

function dataUpdateArrayWhereId(state, action) {
    const valueArray = state.data[action.payload.property].map((item) => {
        if (item.id === action.payload.element.id) {
            return action.payload.element;
        }
        return item;
    });

    return {
        ...state,
        data: {
            ...state.data,
            [action.payload.property]: valueArray
        }
    };
}

function dataUpdateArrayPropertyWhereId(state, action) {
    const valueArray = state.data[action.payload.property].map((item) => {
        if (item.id === action.payload.id) {
            return {
                ...item,
                [action.payload.arrayProperty]: action.payload.value
            };
        }
        return item;
    });

    return {
        ...state,
        data: {
            ...state.data,
            [action.payload.property]: valueArray
        }
    };
}

// Errors
function errorsUpdate(state, action) {
    return {
        ...state,
        errors: {
            status: action.payload.status,
            message: action.payload.message
        },
        loading: false,
        submit: false
    };
}

const resetErrors = state => ({
    ...state,
    errors: {},
    success: false
});

// Resource
function singleResourceUpdate(state, action) {
    const updatedDataObject = { ...state.data };
    Object.entries(action.payload).forEach(([key, value]) => {
        updatedDataObject[key] = value;
    });

    return {
        ...state,
        data: updatedDataObject,
        loading: false
    };
}

// Collection
function collectionUpdate(state, action) {
    return {
        ...state,
        data: action.payload.data,
        loading: false
    };
}

// Validation
function validationUpdate(state, { payload }) {
    const {
        property, validation, valid, errorsCount
    } = payload;
    return {
        ...state,
        validationErrors: {
            ...state.validationErrors,
            [property]: validation
        },
        valid,
        errorsCount
    };
}

export {
    loadingToggleFalse,
    loadingToggleTrue,
    submitToggleFalse,
    submitToggleTrue,
    dataUpdateProperty,
    dataUpdateArray,
    dataUpdatArrayRemoveElement,
    dataUpdateArrayWhereId,
    dataUpdateArrayPropertyWhereId,
    errorsUpdate,
    resetErrors,
    singleResourceUpdate,
    collectionUpdate,
    validationUpdate
};
