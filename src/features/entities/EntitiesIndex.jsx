import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// Components
import {
    Breadcrumb,
    TabItem,
    Tabs
} from '../../components';
import Table from './table/Table';
import BannerDeleteModal from '../banners-modals/BannerDeleteModal';
import BannerActiveChangeModal from '../banners-modals/BannerActiveChangeModal';

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

    const [modalIsActiveDelete, modalDataDelete, openModalDelete, closeModalDelete] = useModal({});
    const [modalIsActiveDeleteBulk, modalDataDeleteBulk, openModalDeleteBulk, closeModalDeleteBulk] = useModal({});
    const [modalIsActiveActivate, modalDataActivate, openModalActivate, closeModalActivate] = useModal([]);
    const [modalIsActiveDeactivate, modalDataDeactivate, openModalDeactivate, closeModalDeactivate] = useModal([]);

    const getActiveTableActions = ({ id, name }) => ([
        ['Edit', () => history.push(`/entities/${id}`), <EditIcon />],
        ['Deactivate', () => actions.deactivateBanner({ id, name }), <DeactivateIcon />],
        ['Delete', () => openModalDelete({ id, name }), <DeleteIcon />]
    ]);

    const getInactiveTableActions = ({ id, name }) => ([
        ['Edit', () => history.push(`/entities/${id}`), <EditIcon />],
        ['Activate', () => actions.activateBanner({ id, name }), <ActivateIcon />],
        ['Delete', () => openModalDelete({ id, name }), <DeleteIcon />]
    ]);

    const handleDeleteBulk = (bannersId) => {
        actions.deleteBanners(bannersId);
    };

    const handleDelete = (data) => {
        actions.deleteBanner(data);
    };

    const handleActivate = (bannersId) => {
        actions.activateBanners(bannersId);
    };

    const handleDeactivate = (bannersId) => {
        actions.deactivateBanners(bannersId);
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
            <BannerDeleteModal
                isSingle
                isActive={modalIsActiveDelete}
                onDelete={handleDelete}
                onClose={closeModalDelete}
                data={modalDataDelete}
            />
            <BannerDeleteModal
                isActive={modalIsActiveDeleteBulk}
                onDelete={handleDeleteBulk}
                onClose={closeModalDeleteBulk}
                data={modalDataDeleteBulk}
            />
            <BannerActiveChangeModal
                isActive={modalIsActiveActivate}
                data={modalDataActivate}
                onDelete={handleActivate}
                onClose={closeModalActivate}
            />
            <BannerActiveChangeModal
                isActive={modalIsActiveDeactivate}
                data={modalDataDeactivate}
                type="deactivate"
                onDelete={handleDeactivate}
                onClose={closeModalDeactivate}
            />
        </React.Fragment>
    );
};

EntitiesIndex.defaultProps = defaultProps;
EntitiesIndex.propTypes = propTypes;

export default withRouter(EntitiesIndex);
