const actionTypes = (reducerName) => {
    return {
        getLoading: `${reducerName}GetLoading`,
        getSuccess: `${reducerName}GetSuccess`,
        getFailed: `${reducerName}GetFailed`,
        inputChange: `${reducerName}InputChange`,
        postSubmitting: `${reducerName}PostSubmitting`,
        postSuccess: `${reducerName}PostSuccess`,
        postFailed: `${reducerName}PostFailed`,
        redirect: `${reducerName}Redirect`,
        reset: `${reducerName}Reset`,
        resetErrors: `${reducerName}ResetErrors`,
        dataUpdateProperty: `${reducerName}UpdateDataProperty`,
        dataUpdateArray: `${reducerName}UpdateDataArray`,
        dataUpdateArrayRemoveElement: `${reducerName}UpdateDataArrayRemoveElement`,
        dataUpdateArrayWhereId: `${reducerName}UpdateDataArrayWhereId`,
        dataUpdateArrayPropertyWhereId: `${reducerName}UpdateDataArrayPropertyWhereId`,
        validationUpdate: `${reducerName}UpdateValidation`
    };
};

export default actionTypes;
