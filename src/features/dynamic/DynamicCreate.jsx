import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

// Actions
import { postCreate } from '../../redux/actions/dynamic/createActions';

// Components
import {
    Breadcrumb,
    Button,
    FormWrapperSubmit
} from '../../components';
import CreateEditForm from './CreateEditForm';

// HOC
import useForm from '../../utils/useForm';

// Prop types
const propTypes = {
    dataTypes: PropTypes.instanceOf(Object).isRequired,
    match: PropTypes.instanceOf(Object).isRequired,
    history: PropTypes.instanceOf(Object).isRequired
};

const DynamicCreate = ({
    dataTypes,
    history,
    match
}) => {
    // Application State
    const {
        dynamic: {
            create: {
                data,
                submit,
                validationSchema
            }
        }
    } = useSelector(state => state);

    const dispatch = useDispatch();

    const {
        touched,
        isValid,
        validation,
        values,
        onBlur,
        onChange,
        onSubmit
    } = useForm(data, validationSchema);

    // Url
    const { path } = match;
    const [, url] = path.split('/');

    const handleSubmit = (formValues, setErrors) => {
        dispatch(postCreate({
            data: formValues,
            setErrors,
            url
        }));
    };

    const handleCancel = () => {
        history.push(`/${url}`);
    };

    return (
        <Fragment>
            <Breadcrumb
                links={[<Link to={`/${url}`}>Index</Link>]}
                spacing="0"
                title="Create new"
            />
            <CreateEditForm
                dataTypes={dataTypes}
                touched={touched}
                validation={validation}
                values={values}
                onBlur={onBlur}
                onChange={onChange}
            />
            <FormWrapperSubmit>
                <Button
                    isOutlined
                    spacing="0 auto 0 0"
                    title="Cancel"
                    onClick={handleCancel}
                />
                <Button
                    isDisabled={!isValid}
                    isLoading={submit}
                    title="Create"
                    onClick={onSubmit(handleSubmit)}
                />
            </FormWrapperSubmit>
        </Fragment>
    );
};

DynamicCreate.propTypes = propTypes;

export default withRouter(DynamicCreate);
