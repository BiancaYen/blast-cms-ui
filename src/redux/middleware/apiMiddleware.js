import Notifications from '../../components/notifications/Notifications';
import browserHistory from '../../utils/browserHistory';

// Action Types
import actionTypes from '../actions/actionTypes';

// Utils
import toCamelCase from '../../utils/toCamelCase';

const formatNotificationMessage = requestType => (notificationDetail) => {
    switch (requestType) {
        case 'activate': {
            return `${notificationDetail} has been successfully activated.`;
        }
        case 'create': {
            return `${notificationDetail} has been successfully created.`;
        }
        case 'custom': {
            return notificationDetail;
        }
        case 'delete': {
            return `${notificationDetail} has been successfully deleted.`;
        }
        case 'deactivate': {
            return `${notificationDetail} has been successfully deactivated.`;
        }
        case 'duplicate': {
            return `${notificationDetail} has been successfully duplicated.`;
        }
        case 'edit': {
            return `${notificationDetail} has been successfully updated.`;
        }
        case 'reactivate': {
            return `${notificationDetail} has been successfully reactivated.`;
        }
        case 'publish': {
            return `${notificationDetail} has been successfully published.`;
        }
        case 'unsubscribe': {
            return `${notificationDetail} has been successfully unsubscribed.`;
        }
        default: {
            return 'Your request has been successful.';
        }
    }
};

export default function apiMiddleware({ dispatch }) {
    return (next) => {
        return (action) => {
            const {
                callApiClient,
                dispatchFromPayload,
                dispatchFromError,
                reducerName,
                requestType,
                setFormErrors,
                showNotification = true
            } = action;

            // If not request option is specified handle like normal action and pass on
            if (!callApiClient) {
                return next(action);
            }

            // Error handling
            if (typeof callApiClient !== 'function') {
                throw new Error('Expected "callApiClient" to be a function.');
            }

            if (typeof dispatchFromPayload !== 'function') {
                throw new Error('Expected "dispatchFromPayload" to be a function.');
            }

            if (typeof reducerName !== 'string') {
                throw new Error('Expected "reducerName" to be a string.');
            }

            if (typeof requestType !== 'string') {
                throw new Error('Expected "requestType" to be a string.');
            }

            const isGetType = requestType === 'get';

            const loadingType = isGetType ? actionTypes(reducerName).getLoading : actionTypes(reducerName).postSubmitting;
            const successType = isGetType ? actionTypes(reducerName).getSuccess : actionTypes(reducerName).postSuccess;
            const failedType = isGetType ? actionTypes(reducerName).getFailed : actionTypes(reducerName).postFailed;

            dispatch({
                type: loadingType
            });

            return callApiClient().then((response) => {
                // Format the payload and pass it through the dispatchFromPayload function
                const { data } = response;
                const payload = dispatchFromPayload(data || response) || {};

                dispatch({
                    type: successType,
                    payload
                });

                // Dispatch success notification if notificationDetail has been set
                const { notificationDetail = '' } = payload || {};

                if (notificationDetail) {
                    Notifications.addWithTimeout({
                        message: formatNotificationMessage(requestType)(notificationDetail),
                        type: 'success'
                    });
                }
            }).catch((error) => {
                // If dispatchFromError function has been set pass the error
                if (dispatchFromError) {
                    dispatchFromError(error.response);
                }

                const { status, data = {}, config = {} } = error.response || {};
                const { errors: message = '' } = data.errors || {};
                const { url = '' } = config || {};
                const route = url.replace(process.env.REACT_APP_API_HOST, '');

                if (status) {
                    dispatch({
                        type: failedType,
                        payload: {
                            status,
                            message
                        }
                    });

                    // Unauthorized
                    if (status === 401 && browserHistory.location.pathname !== '/') {
                        localStorage.setItem('token', '');
                        browserHistory.push('/');
                    }

                    // Unprocessable Entity
                    if (status === 422) {
                        if (requestType === 'get') {
                            // Not a submit form, so all validation errors need to be outputted via a notification
                            const errors = [];
                            if (Array.isArray(message)) {
                                Object.values(message).forEach((value) => {
                                    errors.push(value[0]);
                                });
                            } else {
                                errors.push('The request cannot be processed with the given parameters.');
                            }
                            if (showNotification) {
                                Notifications.add({
                                    message: errors.join('; '),
                                    type: 'error'
                                });
                            }
                        } else if (setFormErrors && typeof setFormErrors === 'function') {
                            const inputs = Object.entries(data.errors);
                            const validationErrors = {};

                            inputs.forEach(([input, [apiError]]) => {
                                validationErrors[toCamelCase(input)] = { status: 'error', error: apiError };
                            });

                            if (inputs.length) {
                                setFormErrors(validationErrors);
                            }
                        }
                    }

                    // Forbidden
                    // Only dispatch notifications for requests other than showType,
                    // in which case we use the <Unauthorised /> component
                    if (status === 403 && showNotification) {
                        Notifications.add({
                            message: message || `Forbidden: ${route}.`,
                            type: 'error'
                        });
                    }

                    // Not Found
                    // Only dispatch notifications for requests other than showType,
                    // in which case we use the <NotFound /> component
                    if (status === 404 && showNotification) {
                        Notifications.add({
                            message: message || `Not found: ${route}.`,
                            type: 'warning'
                        });
                    }

                    // Not Allowed
                    if (status === 405 && showNotification) {
                        Notifications.add({
                            message: message || 'Method not allowed.',
                            type: 'error'
                        });
                    }

                    // Internal Server Error
                    if (status === 500 && showNotification) {
                        Notifications.add({
                            message: message || 'An internal server error has occurred.',
                            type: 'error'
                        });
                    }

                    // Internal Gateway Timeout Error
                    if (status === 504 && showNotification) {
                        Notifications.add({
                            message: 'Gateway Timeout: The request to the server has timed out.',
                            type: 'error'
                        });
                    }
                }
            });
        };
    };
}
