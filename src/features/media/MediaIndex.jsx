import React from 'react';

// Components
import {
    Breadcrumb,
    Tabs,
    TabItem
} from '../../components';

// Feature Components
import ImagesTab from './ImagesTab';

const MediaIndex = () => {
    return (
        <React.Fragment>
            <Breadcrumb title="Manage your media" />
            <Tabs>
                <TabItem id="images" title="Images" spacing="0">
                    <ImagesTab />
                </TabItem>
                <TabItem id="documents" title="Documents" spacing="0" />
            </Tabs>
        </React.Fragment>
    );
};

export default MediaIndex;
