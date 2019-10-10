import moment from 'moment';

const getBannersShared = (reducerName, api) => () => (dispatch) => {
    dispatch({
        callApiClient: () => api(),
        reducerName,
        requestType: 'get',
        dispatchFromPayload: data => ({
            data: data.map(({
                id,
                attributes: {
                    bannerName = '',
                    bannerImageUrl = '',
                    redirectUrl = '',
                    createdAt = null
                } = {}
            }) => ({
                id,
                name: bannerName,
                redirectUrl,
                imageURL: bannerImageUrl,
                dateAdded: createdAt && moment(createdAt.date).format('D MMMM YYYY h:mm')
            }))
        })
    });
};

export default getBannersShared;
