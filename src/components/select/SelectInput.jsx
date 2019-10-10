import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styles
import {
    Placeholder,
    InputWrapper,
    CounterBadge
} from './styles';

// Components
import HiddenContent from '../../components/hidden-content/HiddenContent';

// Default props
const defaultProps = {
    customTag: null,
    isDisabled: false,
    items: [],
    onClick: () => {}
};

// Prop types
const propTypes = {
    customTag: PropTypes.elementType,
    dataDisplayKey: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    items: PropTypes.instanceOf(Array),
    placeholder: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onDelete: PropTypes.func.isRequired
};

const CHARACTER_WIDTH = 8;

class SelectInput extends Component {
    state = {
        canRenderTags: [],
        isShowAllTags: false,
        isShouldRerender: false,
        positionLeft: 0,
        prevItemsLength: 0
    };

    inputWrapperRef = React.createRef();
    scrollableWrapperRef = React.createRef();

    getNumTags = () => {
        let tagsWidthSum = 0;
        let count = 0;

        if (!this.scrollableWrapperRef.current) {
            return 1;
        }

        const tagsWidth = Array.from(this.scrollableWrapperRef.current.children || [])
            .map(node => node.clientWidth);
        const inputWrapperWidth = this.inputWrapperRef.current.clientWidth || 0;

        tagsWidth.some((item) => {
            tagsWidthSum += item;

            count += 1;

            return tagsWidthSum >= (inputWrapperWidth - 80);
        });

        return count;
    };

    setScroll = (step = 200) => {
        if (this.isCanScroll()) {
            this.setState(({ positionLeft }) => {
                const selectedListWidth = this.scrollableWrapperRef.current.clientWidth;
                const lastTagWidth = this.scrollableWrapperRef.current.lastChild.clientWidth || 200;

                const nextPositionLeft = positionLeft + step;

                if (nextPositionLeft > 0) {
                    return { positionLeft: 0 };
                }


                return {
                    positionLeft: nextPositionLeft > -selectedListWidth + lastTagWidth
                        ? nextPositionLeft
                        : -selectedListWidth + lastTagWidth
                };
            });
        }
    };

    isCanScroll = () => {
        if (!this.inputWrapperRef.current || !this.scrollableWrapperRef.current) {
            return true;
        }

        const inputWidth = this.inputWrapperRef.current.clientWidth || 0;
        const selectedListWidth = this.scrollableWrapperRef.current.clientWidth || 0;

        return selectedListWidth > inputWidth;
    };

    getItems = () => {
        const { items } = this.props;
        const { isShowAllTags, canRenderTags } = this.state;

        return isShowAllTags ? items : canRenderTags;
    };

    getInputText = () => {
        const { items, dataDisplayKey } = this.props;

        const itemsTitles = items.map(({ [dataDisplayKey]: title }) => title);

        let count = 0;
        let titlesWidthSum = 0;
        const inputWidth = (this.inputWrapperRef.current && this.inputWrapperRef.current.clientWidth) || 100;

        const titlesWidth = itemsTitles
            .map(title => (title.toString().length * CHARACTER_WIDTH) + 5);

        titlesWidth.some((item) => {
            titlesWidthSum += item;
            count += 1;

            return titlesWidthSum >= inputWidth - 60;
        });

        return `${itemsTitles.slice(0, count).join(', ')}${itemsTitles.length - count
            ? `, +${itemsTitles.length - count}`
            : ''}`;
    };

    handleDelete = id => () => {
        const { positionLeft } = this.state;
        if (positionLeft < -this.scrollableWrapperRef.current.clientWidth + 100) {
            this.setScroll(200);
        }

        this.props.onDelete(id);
    };

    handleScroll = (event) => {
        const { customTag } = this.props;

        if (customTag && this.isCanScroll()) {
            event.preventDefault();
            this.setScroll(-event.deltaY);
        }
    };

    handleShowAll = () => {
        this.setState({
            isShowAllTags: true
        });
    };

    handleOnCLick = ({ target }) => {
        const { onClick, isDisabled } = this.props;

        if (!isDisabled && target.isSameNode(this.inputWrapperRef.current)) {
            onClick();
        }
    };

    handleWindowResize = () => {
        const { items, customTag } = this.props;
        const {
            isShowAllTags,
            isShouldRerender
        } = this.state;

        if (customTag && !isShowAllTags) {
            if (isShouldRerender) {
                const availableItems = this.getNumTags();

                this.setState({
                    canRenderTags: availableItems > 1 ? items.slice(0, availableItems) : items,
                    isShouldRerender: false
                });

                return;
            }

            this.setState({
                canRenderTags: items,
                isShouldRerender: true,
                prevItemsLength: items.length
            });
        } else {
            this.forceUpdate();
        }
    };

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize);
        this.inputWrapperRef.current.addEventListener('wheel', this.handleScroll);
    }

    componentDidUpdate() {
        const { items, customTag } = this.props;
        const {
            isShowAllTags,
            isShouldRerender,
            prevItemsLength
        } = this.state;

        if (customTag && !isShowAllTags) {
            if (isShouldRerender) {
                const availableItems = this.getNumTags();

                // eslint-disable-next-line react/no-did-update-set-state
                this.setState({
                    canRenderTags: availableItems > 1 ? items.slice(0, availableItems) : items,
                    isShouldRerender: false
                });
            }

            if (prevItemsLength !== items.length) {
                // eslint-disable-next-line react/no-did-update-set-state
                this.setState({
                    canRenderTags: items,
                    isShouldRerender: true,
                    prevItemsLength: items.length
                });
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        this.inputWrapperRef.current.removeEventListener('wheel', this.handleScroll);
    }

    render() {
        const {
            customTag: CustomTagComponent,
            items,
            isDisabled,
            dataDisplayKey,
            placeholder
        } = this.props;

        const {
            positionLeft,
            prevItemsLength,
            isShowAllTags,
            canRenderTags
        } = this.state;

        return (
            <InputWrapper
                innerRef={this.inputWrapperRef}
                isShouldScroll={!!CustomTagComponent}
                positionLeft={this.isCanScroll() ? positionLeft : 0}
                onClick={this.handleOnCLick}
            >
                {/* Custom tag */}
                <HiddenContent isHidden={!CustomTagComponent || !items.length}>
                    <div ref={this.scrollableWrapperRef}>
                        {
                            CustomTagComponent && this.getItems().map(item => (
                                <div key={item.id}>
                                    <CustomTagComponent
                                        {...item}
                                        isDisabled={isDisabled}
                                        onDelete={this.handleDelete(item.id)}
                                    >
                                        {item[dataDisplayKey]}
                                    </CustomTagComponent>
                                </div>
                            ))
                        }
                    </div>
                    {!!(items.length - canRenderTags.length) && prevItemsLength === items.length && !isShowAllTags &&
                    <CounterBadge onClick={this.handleShowAll}>
                        +{items.length - canRenderTags.length}
                    </CounterBadge>
                    }
                </HiddenContent>

                {/* Default tag */}
                {!CustomTagComponent && this.getInputText()}

                {/* Placeholder */}
                {!items.length && <Placeholder>{placeholder}</Placeholder>}
            </InputWrapper>
        );
    }
}

SelectInput.defaultProps = defaultProps;
SelectInput.propTypes = propTypes;

export default SelectInput;
