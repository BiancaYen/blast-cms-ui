import React from 'react';
import { useDispatch, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

// Actions
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
const mapStateToProps = ({ entities: { create } }) => {
    const { data, submit, validationSchema } = create;

    return {
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
    match: PropTypes.instanceOf(Object).isRequired,
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


const DynamicEdit = ({
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

    const onSubmitActive = (formValues, setErrors) => {
        dispatch(postCreate(
            formValues,
            { setErrors }
        ));
    };

    const handleCancel = () => {
        history.push(`/${url}`);
    };

    return (
        <React.Fragment>
            <Breadcrumb
                links={[<Link to={`/${url}`}>Index</Link>]}
                spacing="0"
                title="Edit"
            />
            <CreateEditForm
                touched={touched}
                validation={validation}
                values={values}
                onBlur={onBlur}
                onChange={onChange}
            />
            <FormWrapperSubmit>
                <Button
                    outlined
                    spacing="0 auto 0 0"
                    title="Cancel"
                    onClick={handleCancel}
                />
                <Button
                    disabled={!isValid}
                    loading={submit}
                    title="Save"
                    onClick={onSubmit(onSubmitActive)}
                />
            </FormWrapperSubmit>
        </React.Fragment>
    );
};

DynamicEdit.defaultProps = defaultProps;
DynamicEdit.propTypes = propTypes;

export default connect(mapStateToProps, null)(withRouter(withForm(DynamicEdit)));
