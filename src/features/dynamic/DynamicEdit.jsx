import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

// Actions
import { getEdit, postEdit } from '../../redux/actions/dynamic/editActions';

// Components
import {
    Breadcrumb,
    Button,
    FormWrapperSubmit,
    Loader
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

const DynamicEdit = ({
    dataTypes,
    history,
    match
}) => {
    // Application State
    const {
        dynamic: {
            edit: {
                data,
                loading,
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
    const { path, params: { id } } = match;
    const [, url] = path.split('/');

    const handleEditSubmit = (formValues, setFormErrors) => {
        dispatch(postEdit({
            data: formValues,
            id,
            setFormErrors,
            url
        }));
    };

    const handleCancel = () => {
        history.push(`/${url}`);
    };

    useEffect(() => {
        dispatch(getEdit({
            id,
            url
        }));
    }, []);

    return (
        <Loader isLoading={loading}>
            <Breadcrumb
                links={[<Link to={`/${url}`}>Index</Link>]}
                spacing="0"
                title="Edit"
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
                    title="Save"
                    onClick={onSubmit(handleEditSubmit)}
                />
            </FormWrapperSubmit>
        </Loader>
    );
};

DynamicEdit.propTypes = propTypes;

export default withRouter(DynamicEdit);
