import React from 'react';
import { useDispatch, connect } from 'react-redux';
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
import withForm from '../../utils/withForm';

// Aplication State
const mapStateToProps = ({ dynamic: { create }, entities }) => {
    const { data, submit, validationSchema } = create;

    return {
        entitiesIndexData: entities.index.data,
        data,
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
    dataTypes: PropTypes.instanceOf(Object).isRequired,
    match: PropTypes.instanceOf(Object).isRequired,
    history: PropTypes.instanceOf(Object).isRequired,
    submit: PropTypes.bool,
    touched: PropTypes.instanceOf(Object).isRequired,
    isValid: PropTypes.bool,
    validation: PropTypes.instanceOf(Object).isRequired,
    values: PropTypes.instanceOf(Object).isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

const DynamicCreate = ({
    dataTypes,
    history,
    match,
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
        <React.Fragment>
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
                    disabled={!isValid}
                    loading={submit}
                    title="Create"
                    onClick={onSubmit(handleSubmit)}
                />
            </FormWrapperSubmit>
        </React.Fragment>
    );
};

DynamicCreate.defaultProps = defaultProps;
DynamicCreate.propTypes = propTypes;

export default connect(mapStateToProps, null)(withRouter(withForm(DynamicCreate)));
