import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

// Actions Creators
import { getSettings } from '../../redux/actions/settings/settingsIndexActions';

// Components
import { Input } from '../../components';

// State
const mapStateToProps = ({ settings: { index } }) => ({
    campaignId: index.data.campaignId,
    settingsLoading: index.loading
});

// Actions
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        getSettings
    },
    dispatch)
});

// Default props
const defaultProps = {
    loading: false
};

// Prop types
const propTypes = {
    actions: PropTypes.shape({
        getSettings: PropTypes.func
    }).isRequired,
    campaignId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    loading: PropTypes.bool
};

const CampaignIdData = ({ actions, campaignId, loading }) => {
    useEffect(() => {
        actions.getSettings();
    }, []);

    return (
        <Input
            hint={(
                <span>
                    {'Go to '}
                    <Link to="/settings">
                        General Settings
                    </Link>
                    {' to edit.'}
                </span>
            )}
            id="campaignId"
            isLoading={loading}
            isReadOnly
            label="Campaign Id"
            value={campaignId}
            onChange={() => {}}
        />
    );
};

CampaignIdData.defaultProps = defaultProps;
CampaignIdData.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(CampaignIdData);
