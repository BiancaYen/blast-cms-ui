import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

// Actions
import { getIndex as dataTypesGetIndex } from '../../redux/actions/data-types/indexActions';
import { getIndex as relationshipTypesGetIndex } from '../../redux/actions/relationship-types/indexActions';
import { postCreate } from '../../redux/actions/entities/createActions';

// Components
import {
    Breadcrumb,
    Button,
    FormWrapperSubmit
} from '../../components';
import CreateEditForm from './CreateEditForm';

// HOC
import useForm from '../../utils/useForm';

// Default props
const defaultProps = {
};

// Prop types
const propTypes = {
    history: PropTypes.instanceOf(Object).isRequired
};

const EntitiesCreate = ({ history }) => {
    // Application State
    const {
        dataTypes: {
            index: dataTypesIndex
        },
        entities: {
            index: entitiesIndex,
            create: {
                data,
                submit,
                validationSchema
            }
        },
        relationshipTypes: {
            index: relationshipTypesIndex
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

    const handleSubmit = (formValues, setFormErrors) => {
        dispatch(postCreate({
            data: formValues,
            setFormErrors
        }));
    };

    const handleCancel = () => {
        history.push('/entities');
    };

    useEffect(() => {
        if (!dataTypesIndex.data.length) {
            dispatch(dataTypesGetIndex());
        }
        if (!relationshipTypesIndex.data.length) {
            dispatch(relationshipTypesGetIndex());
        }
    }, []);

    return (
        <React.Fragment>
            <Breadcrumb
                links={[<Link to="/entities">Index</Link>]}
                spacing="0"
                title="Create new entity"
            />
            <CreateEditForm
                meta={{
                    dataTypesIndex,
                    entitiesIndex,
                    relationshipTypesIndex
                }}
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
        </React.Fragment>
    );
};

EntitiesCreate.defaultProps = defaultProps;
EntitiesCreate.propTypes = propTypes;

export default withRouter(EntitiesCreate);
