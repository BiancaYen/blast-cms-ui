import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// Actions
import { getIndex, postDelete, postDeletes } from '../../redux/actions/dynamic/indexActions';

// Components
import {
    Breadcrumb,
    SectionActions
} from '../../components';
import Table from './table/Table';
import DynamicDeleteModal from './DynamicDeleteModal';

// Icons
import CreateIcon from '../../components/icons/CreateIcon';
import DeleteIcon from '../../components/icons/DeleteIcon';
import EditIcon from '../../components/icons/EditIcon';

// Utils
import useModal from '../../utils/useModal';

// Default props
const defaultProps = {
};

// Prop types
const propTypes = {
    history: PropTypes.instanceOf(Object).isRequired,
    match: PropTypes.instanceOf(Object).isRequired
};

const DynamicIndex = ({
    history,
    match
}) => {
    // Application State
    const { index } = useSelector(state => state.dynamic);

    // Dispatch
    const dispatch = useDispatch();

    // Url
    const { path } = match;
    const url = path.replace('/', '');

    const [modalIsActiveDelete, modalDataDelete, openModalDelete, closeModalDelete] = useModal({});
    const [modalIsActiveDeleteBulk, modalDataDeleteBulk, openModalDeleteBulk, closeModalDeleteBulk] = useModal({});

    const getTableActions = ({ id, name }) => ([
        ['Edit', () => history.push(`/${url}/${id}`), <EditIcon />],
        ['Delete', () => openModalDelete({ id, name }), <DeleteIcon />]
    ]);

    const handleDeleteBulk = (ids) => {
        postDelete(postDeletes(ids));
    };

    const handleDelete = (data) => {
        dispatch(postDelete({
            data,
            url
        }));
    };

    const handleCreateRedirect = () => history.push(`/${url}/create`);

    useEffect(() => {
        dispatch(getIndex(url));
    }, []);

    return (
        <React.Fragment>
            <Breadcrumb title="Index" />
            <SectionActions actions={[
                ['Create', handleCreateRedirect, <CreateIcon />]
            ]}
            />
            <Table
                id="active"
                key="active"
                loading={index.loading}
                data={index.data}
                rowActions={getTableActions}
                onDelete={openModalDeleteBulk}
            />
            <DynamicDeleteModal
                isSingle
                isActive={modalIsActiveDelete}
                onDelete={handleDelete}
                onClose={closeModalDelete}
                data={modalDataDelete}
            />
            <DynamicDeleteModal
                isActive={modalIsActiveDeleteBulk}
                onDelete={handleDeleteBulk}
                onClose={closeModalDeleteBulk}
                data={modalDataDeleteBulk}
            />
        </React.Fragment>
    );
};

DynamicIndex.defaultProps = defaultProps;
DynamicIndex.propTypes = propTypes;

export default withRouter(DynamicIndex);
