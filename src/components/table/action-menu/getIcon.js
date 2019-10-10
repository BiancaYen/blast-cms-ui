import React from 'react';

// Icons
import ViewIcon from '../../icons/VisibleIcon';
import EditIcon from '../../icons/EditFilledIcon';
import DuplicateIcon from '../../icons/DuplicateIcon';
import PublishIcon from '../../icons/PublishIcon';
import DeleteIcon from '../../icons/DeleteIcon';
import ActivateIcon from '../../icons/CheckedIcon';
import DeactivateIcon from '../../icons/DeactivateIcon';
import ReactivateIcon from '../../icons/ReactivateIcon';
import DownloadIcon from '../../icons/DownloadIcon';

const icons = {
    ViewIcon,
    EditIcon,
    DuplicateIcon,
    PublishIcon,
    DeleteIcon,
    ActivateIcon,
    DeactivateIcon,
    ReactivateIcon,
    DownloadIcon
};

const getIcon = (type = '', defaultIcon = null) => {
    const name = `${type.charAt(0).toUpperCase()}${type.slice(1)}Icon`;
    const Icon = icons[name];

    return Icon ? <Icon /> : defaultIcon;
};

export default getIcon;

