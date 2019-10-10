import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

// Actions
import {
    getBannersActive,
    deactivateBanner,
    deactivateBanners
} from '../../redux/actions/hero-banners/indexActiveActions';
import {
    activateBanner,
    activateBanners,
    deleteBanner,
    deleteBanners,
    getBannersInactive
} from '../../redux/actions/hero-banners/indexInactiveActions';

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

// State
const mapStateToProps = ({ heroBanners: { indexActive, indexInactive } }) => ({
    activeData: indexActive.data,
    activeLoading: indexActive.loading,
    inactiveData: indexInactive.data,
    inactiveLoading: indexInactive.loading
});

// Actions
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        activateBanner,
        activateBanners,
        deleteBanner,
        deleteBanners,
        deactivateBanner,
        deactivateBanners,
        getBannersActive,
        getBannersInactive
    },
    dispatch)
});

// Default props
const defaultProps = {
    activeLoading: false,
    inactiveData: [],
    inactiveLoading: false
};

// Prop types
const propTypes = {
    actions: PropTypes.shape({
        activateBanner: PropTypes.func.isRequired,
        activateBanners: PropTypes.func.isRequired,
        deleteBanner: PropTypes.func.isRequired,
        deleteBanners: PropTypes.func.isRequired,
        deactivateBanner: PropTypes.func.isRequired,
        deactivateBanners: PropTypes.func.isRequired,
        getBannersActive: PropTypes.func.isRequired,
        getBannersInactive: PropTypes.func.isRequired
    }).isRequired,
    activeLoading: PropTypes.bool,
    history: PropTypes.instanceOf(Object).isRequired,
    inactiveData: PropTypes.instanceOf(Array),
    inactiveLoading: PropTypes.bool
};

const activeData = [
    { id: 1, name: 'Home' },
    { id: 2, name: 'Company' },
    { id: 3, name: 'About' },
    { id: 4, name: 'Work' },
    { id: 5, name: 'Services' },
    { id: 6, name: 'Products' },
    { id: 7, name: 'Clients' },
    { id: 8, name: 'Posts' },
    { id: 9, name: 'News' },
    { id: 10, name: 'Users' },
    { id: 11, name: 'FAQs' }
];

const EntitiesIndex = ({
    actions,
    activeLoading,
    history,
    inactiveLoading,
    inactiveData
}) => {
    const [modalIsActiveDelete, modalDataDelete, openModalDelete, closeModalDelete] = useModal({});
    const [modalIsActiveDeleteBulk, modalDataDeleteBulk, openModalDeleteBulk, closeModalDeleteBulk] = useModal({});
    const [modalIsActiveActivate, modalDataActivate, openModalActivate, closeModalActivate] = useModal([]);
    const [modalIsActiveDeactivate, modalDataDeactivate, openModalDeactivate, closeModalDeactivate] = useModal([]);

    // @Todo
    // useEffect(() => {
    //     if (!activeData.length && !inactiveData.length) {
    //         actions.getBannersActive();
    //         actions.getBannersInactive();
    //     }
    // }, []);

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
                        loading={activeLoading}
                        data={activeData}
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
