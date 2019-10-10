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
    activeData: [],
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
    activeData: PropTypes.instanceOf(Array),
    activeLoading: PropTypes.bool,
    history: PropTypes.instanceOf(Object).isRequired,
    inactiveData: PropTypes.instanceOf(Array),
    inactiveLoading: PropTypes.bool
};

const HeroBannersIndex = ({
    actions,
    activeData,
    activeLoading,
    history,
    inactiveLoading,
    inactiveData
}) => {
    const [modalIsActiveDelete, modalDataDelete, openModalDelete, closeModalDelete] = useModal({});
    const [modalIsActiveDeleteBulk, modalDataDeleteBulk, openModalDeleteBulk, closeModalDeleteBulk] = useModal({});
    const [modalIsActiveActivate, modalDataActivate, openModalActivate, closeModalActivate] = useModal([]);
    const [modalIsActiveDeactivate, modalDataDeactivate, openModalDeactivate, closeModalDeactivate] = useModal([]);

    useEffect(() => {
        if (!activeData.length && !inactiveData.length) {
            actions.getBannersActive();
            actions.getBannersInactive();
        }
    }, []);

    const getActiveTableActions = ({ id, name }) => ([
        ['Edit', () => history.push(`/hero_banners/${id}`), <EditIcon />],
        ['Deactivate', () => actions.deactivateBanner({ id, name }), <DeactivateIcon />],
        ['Delete', () => openModalDelete({ id, name }), <DeleteIcon />]
    ]);

    const getInactiveTableActions = ({ id, name }) => ([
        ['Edit', () => history.push(`/hero_banners/${id}`), <EditIcon />],
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

    const handleCreateRedirect = () => history.push('/hero_banners/create');

    return (
        <React.Fragment>
            <Breadcrumb title="Index" />
            <Tabs
                items={[['active', 'active'], ['inactive', 'inactive']]}
                actions={[['Add New Hero Banner', handleCreateRedirect, <CreateIcon />]]}
            >
                <TabItem id="active" spacing="0">
                    <Table
                        id="bannersActive"
                        key="bannersActive"
                        loading={activeLoading}
                        data={activeData}
                        rowActions={getActiveTableActions}
                        onDelete={openModalDeleteBulk}
                        onDeactivate={openModalDeactivate}
                    />
                </TabItem>
                <TabItem id="inactive" spacing="0">
                    <Table
                        id="bannersInactive"
                        key="bannersInactive"
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

HeroBannersIndex.defaultProps = defaultProps;
HeroBannersIndex.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeroBannersIndex));
