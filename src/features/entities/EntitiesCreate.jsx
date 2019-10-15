import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

// Actions
import { getIndex } from '../../redux/actions/data-types/indexActions';
import { postCreate } from '../../redux/actions/entities/createActions';

// Components
import {
    Breadcrumb,
    Button,
    FormWrapperSubmit
} from '../../components';
import CreateEditForm from './CreateEditForm';

// HOC
import withForm from '../../utils/withForm';

// Aplication State
const mapStateToProps = ({ dataTypes: { index: dataTypesIndex }, entities: { create } }) => {
    const { data, submit, validationSchema } = create;

    return {
        data,
        dataTypesIndex,
        submit,
        validationSchema
    };
};

// Default props
const defaultProps = {
    submit: false,
    isValid: false
};

// Prop types
const propTypes = {
    dataTypesIndex: PropTypes.shape({
        data: PropTypes.instanceOf(Array).isRequired,
        loading: PropTypes.bool.isRequired
    }).isRequired,
    history: PropTypes.instanceOf(Object).isRequired,
    submit: PropTypes.bool,
    touched: PropTypes.instanceOf(Object).isRequired,
    isValid: PropTypes.bool,
    validation: PropTypes.instanceOf(Object).isRequired,
    values: PropTypes.shape({
        name: PropTypes.string.isRequired,
        fields: PropTypes.instanceOf(Array).isRequired
    }).isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const EntitiesCreate = ({
    dataTypesIndex,
    history,
    submit,
    touched,
    isValid,
    validation,
    values,
    onBlur,
    onChange,
    onSubmit
}) => {
    const dispatch = useDispatch();

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
            dispatch(getIndex());
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
                    dataTypesIndex
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
                    disabled={!isValid}
                    loading={submit}
                    title="Create"
                    onClick={onSubmit(handleSubmit)}
                />
            </FormWrapperSubmit>
        </React.Fragment>
    );
};

EntitiesCreate.defaultProps = defaultProps;
EntitiesCreate.propTypes = propTypes;

export default connect(mapStateToProps, null)(withRouter(withForm(EntitiesCreate)));
