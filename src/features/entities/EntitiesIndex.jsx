import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// Actions
import { postDeactivate, postDelete } from '../../redux/actions/entities/indexActions';
import { postActivate } from '../../redux/actions/entities/indexInactiveActions';

// Components
import {
    Breadcrumb,
    TabItem,
    Tabs
} from '../../components';
import Table from './table/Table';
import EntitiesDeleteModal from './EntitiesDeleteModal';
import EntittiesActiveChangeModal from './EntittiesActiveChangeModal';

// Icons
import ActivateIcon from '../../components/icons/ActivateIcon';
import CreateIcon from '../../components/icons/CreateIcon';
import DeactivateIcon from '../../components/icons/DeactivateIcon';
import DeleteIcon from '../../components/icons/DeleteIcon';
import EditIcon from '../../components/icons/EditIcon';

// Utils
import useModal from '../../utils/useModal';

// Default props
const defaultProps = {
    inactiveData: [],
    inactiveLoading: false
};

// Prop types
const propTypes = {
    history: PropTypes.instanceOf(Object).isRequired,
    inactiveData: PropTypes.instanceOf(Array),
    inactiveLoading: PropTypes.bool
};

const EntitiesIndex = ({
    history,
    inactiveLoading,
    inactiveData
}) => {
    // Application State
    const { index } = useSelector(state => state.entities);

    const dispatch = useDispatch();

    const [modalIsActiveDelete, modalDataDelete, openModalDelete, closeModalDelete] = useModal({});
    const [modalIsActiveDeleteBulk, modalDataDeleteBulk, openModalDeleteBulk, closeModalDeleteBulk] = useModal({});
    const [modalIsActiveActivate, modalDataActivate, openModalActivate, closeModalActivate] = useModal([]);
    const [modalIsActiveDeactivate, modalDataDeactivate, openModalDeactivate, closeModalDeactivate] = useModal([]);

    const getActiveTableActions = ({ id, modelName }) => ([
        ['Edit', () => history.push(`/entities/${id}`), <EditIcon />],
        ['Deactivate', () => dispatch(postDeactivate({ id, modelName })), <DeactivateIcon />],
        ['Delete', () => openModalDelete({ id, modelName }), <DeleteIcon />]
    ]);

    const getInactiveTableActions = ({ id, modelName }) => ([
        ['Edit', () => history.push(`/entities/${id}`), <EditIcon />],
        ['Activate', () => dispatch(postActivate({ id, modelName })), <ActivateIcon />],
        ['Delete', () => openModalDelete({ id, modelName }), <DeleteIcon />]
    ]);

    const handleDeleteBulk = (ids) => {
        console.log(ids);
    };

    const handleDelete = (data) => {
        dispatch(postDelete(data));
    };

    const handleActivateBulk = (ids) => {
        console.log(ids);
    };

    const handleDeactivateBulk = (ids) => {
        console.log(ids);
    };

    const handleCreateRedirect = () => history.push('/entities/create');

    return (
        <React.Fragment>
            <Breadcrumb title="Index" />
            <Tabs
                actions={[['Create New Entity', handleCreateRedirect, <CreateIcon />]]}
            >
                <TabItem id="active" title="Active" spacing="0">
                    <Table
                        id="active"
                        key="active"
                        loading={index.loading}
                        data={index.data}
                        rowActions={getActiveTableActions}
                        onDelete={openModalDeleteBulk}
                        onDeactivate={openModalDeactivate}
                    />
                </TabItem>
                <TabItem id="inactive" title="Inactive" spacing="0">
                    <Table
                        id="inactive"
                        key="inactive"
                        loading={inactiveLoading}
                        data={inactiveData}
                        rowActions={getInactiveTableActions}
                        onDelete={openModalDeleteBulk}
                        onActivate={openModalActivate}
                    />
                </TabItem>
            </Tabs>
            <EntitiesDeleteModal
                data={modalDataDelete}
                isActive={modalIsActiveDelete}
                isSingle
                isSubmitting={index.submit}
                onClose={closeModalDelete}
                onDelete={handleDelete}
            />
            <EntitiesDeleteModal
                data={modalDataDeleteBulk}
                isActive={modalIsActiveDeleteBulk}
                isSubmitting={index.submit}
                onClose={closeModalDeleteBulk}
                onDelete={handleDeleteBulk}
            />
            <EntittiesActiveChangeModal
                isActive={modalIsActiveActivate}
                data={modalDataActivate}
                onDelete={handleActivateBulk}
                onClose={closeModalActivate}
            />
            <EntittiesActiveChangeModal
                isActive={modalIsActiveDeactivate}
                data={modalDataDeactivate}
                type="deactivate"
                onDelete={handleDeactivateBulk}
                onClose={closeModalDeactivate}
            />
        </React.Fragment>
    );
};

EntitiesIndex.defaultProps = defaultProps;
EntitiesIndex.propTypes = propTypes;

export default withRouter(EntitiesIndex);
