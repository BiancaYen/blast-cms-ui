import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// Styles
import {
    ActionsWrapper,
    ChildWrapper,
    Divider,
    SubTab,
    SubTabsWrapper,
    TabWrapper,
    TabsWrapper,
    Wrapper
} from './styles';

// Components
import ArrowButton from '../../components/arrow-button/ArrowButton';
import SectionActions from '../../components/section-actions/SectionActions';

// Types
import { SubTabsType } from './SubTabs';

// Utils
import getQueryTab from './getQueryTab';
import * as ActionPropTypes from '../../utils/actionPropType';

// Constants
const SCROLL_BUTTON_WIDTH = 27; // Scroll button initial width

// Default Props
const defaultProps = {
    actions: [],
    activeSubTab: '',
    activeTab: '',
    spacing: '',
    withQuery: false
};

// Prop Types
const propTypes = {
    actions: ActionPropTypes.actionPropType([
        ActionPropTypes.title.isRequired,
        ActionPropTypes.action.isRequired,
        ActionPropTypes.icon
    ]),
    activeSubTab: PropTypes.string,
    activeTab: PropTypes.string,
    children: PropTypes.node.isRequired,
    location: PropTypes.instanceOf(Object).isRequired,
    spacing: PropTypes.string,
    withQuery: PropTypes.bool
};

class Tabs extends Component {
    state = {
        activeSubTab: null,
        activeTab: null,
        positionLeft: SCROLL_BUTTON_WIDTH,
        tabs: [],
        tabHover: null
    };

    actionsRef = React.createRef();
    tabsWrapperRef = React.createRef();
    wrapperRef = React.createRef();

    static getTabItemDetails = (elements) => {
        const tabs = [];

        React.Children.forEach(elements, (element, index) => {
            let subTabs = [];

            if (!React.isValidElement(element)) return;

            const {
                badge,
                children,
                id,
                title = `TabWrapper ${index}`
            } = element.props;

            if (element.type.componentType === SubTabsType) {
                subTabs = this.getTabItemDetails(children);
            }

            tabs.push({ badge, id, title, subTabs });
        });

        return tabs;
    };

    isShouldScroll = () => {
        if (
            !this.tabsWrapperRef.current
            || !this.wrapperRef.current
            || !this.actionsRef.current
        ) {
            return false;
        }

        const tabsWrapperWidth = this.tabsWrapperRef.current.clientWidth;
        const wrapperWidth = this.wrapperRef.current.clientWidth;
        const actionsWidth = this.actionsRef.current.clientWidth;

        return tabsWrapperWidth > (wrapperWidth - actionsWidth);
    };

    calcWrapperPositionLeft = (tabIndex) => {
        const { positionLeft } = this.state;
        const tabsNodes = Array.from(this.tabsWrapperRef.current.children);

        if (tabIndex >= 0 && this.isShouldScroll()) {
            const sumTabsWidth = tabsNodes.map(node => node.clientWidth)
                .slice(0, tabIndex + 1)
                .reduce((accumulator, value) => accumulator + value, 0);

            const result = Math.round(sumTabsWidth - (this.wrapperRef.current.clientWidth / 2));

            return result >= 0 ? -result : SCROLL_BUTTON_WIDTH;
        }

        return positionLeft;
    };

    canScroll = (positionLeft) => {
        if (
            !this.tabsWrapperRef.current
            || this.tabsWrapperRef.current.clientWidth <
            (this.wrapperRef.current.clientWidth - this.actionsRef.current.clientWidth)
        ) {
            return {
                canScrollLeft: false,
                canScrollRight: false
            };
        }

        const lastTabWidth = Array.from(this.tabsWrapperRef.current.children)
            .pop()
            .clientWidth;
        const tabsWidth = this.tabsWrapperRef.current.clientWidth;

        return {
            canScrollLeft: positionLeft < SCROLL_BUTTON_WIDTH,
            canScrollRight: positionLeft > -tabsWidth + lastTabWidth + SCROLL_BUTTON_WIDTH
        };
    };

    getCurrentTab = (id, subTab = null) => {
        const { tabs, activeTab, activeSubTab } = this.state;

        const targetTab = tabs.find(({ id: itemId }) => itemId === (id || activeTab));
        const { subTabs = [] } = targetTab;
        const [{ id: firstSubTabId = null } = {}] = subTabs;

        const targetSubTabId = subTab || activeSubTab || firstSubTabId;
        const targetSubTab = subTabs.find(({ id: itemId }) => itemId === targetSubTabId) || null;

        return {
            activeTab: targetTab,
            activeSubTab: targetSubTab
        };
    };

    setTabsScroll = (step = 200) => {
        if (this.isShouldScroll()) {
            this.setState(({ positionLeft }) => {
                const lastTabWidth = Array.from(this.tabsWrapperRef.current.children)
                    .pop()
                    .clientWidth;
                const tabsWidth = this.tabsWrapperRef.current.clientWidth;

                const nextPositionLeft = positionLeft + step;

                if (nextPositionLeft > SCROLL_BUTTON_WIDTH) {
                    return { positionLeft: SCROLL_BUTTON_WIDTH };
                }


                return {
                    positionLeft: nextPositionLeft <= -tabsWidth + lastTabWidth + SCROLL_BUTTON_WIDTH
                        ? -tabsWidth + lastTabWidth + SCROLL_BUTTON_WIDTH
                        : nextPositionLeft
                };
            });
        }
    };

    focusActiveTab = () => {
        const { activeTab, activeSubTab } = this.props;
        const { tabs } = this.state;

        if (activeTab || activeSubTab) {
            const currentTabIndex = tabs.map(({ id }) => id).indexOf(activeTab);

            this.setState({
                positionLeft: this.calcWrapperPositionLeft(currentTabIndex)
            });
        }
    };

    handleTabToggle = (id, subTab = null) => (event) => {
        event.stopPropagation();

        const { withQuery } = this.props;
        const { tabs } = this.state;

        const { activeSubTab } = this.getCurrentTab(id, subTab);

        const currentTabIndex = tabs.map(({ id: tabId }) => tabId).indexOf(id);

        this.setState({
            activeTab: id,
            activeSubTab: activeSubTab ? activeSubTab.id : null,
            positionLeft: this.calcWrapperPositionLeft(currentTabIndex)
        });

        if (withQuery) {
            history.pushState('', '', `?tab=${id}&subTab=${activeSubTab}`);
        }
    };

    handleItemHover = (tabHover = null) => () => {
        this.setState({ tabHover });
    };

    handleScroll = (event) => {
        event.preventDefault();

        this.setTabsScroll(-event.deltaY);
    };

    handleScrollLeft = () => this.setTabsScroll();

    handleScrollRight = () => this.setTabsScroll(-200);

    handleResize = () => {
        if (!this.isShouldScroll()) {
            this.setState({
                positionLeft: SCROLL_BUTTON_WIDTH
            });
        } else {
            this.forceUpdate();
        }
    };

    static getDerivedStateFromProps({
        activeSubTab,
        activeTab,
        children,
        withQuery,
        location
    }, { tabs: stateTabs }) {
        if (children.length !== stateTabs.length) {
            const { tab, subTab } = getQueryTab(location);
            const tabs = Tabs.getTabItemDetails(children);
            const [firstTab = {}] = tabs;
            const [firstSubTab = {}] = firstTab.subTabs;

            return {
                tabs,
                tabHover: null,
                activeTab: activeTab || (withQuery && tab) || firstTab.id || null,
                activeSubTab: activeSubTab || (withQuery && subTab) || firstSubTab.id || null
            };
        }

        return null;
    }

    componentDidMount() {
        // Params fix "'location' PropType is defined but prop is never used" eslint error
        this.focusActiveTab(this.props.location);
        this.forceUpdate();

        this.wrapperRef.current.addEventListener('wheel', this.handleScroll);
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        this.wrapperRef.current.removeEventListener('wheel', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
    }

    render() {
        const { actions, children, spacing } = this.props;
        const {
            activeSubTab,
            activeTab,
            positionLeft,
            tabHover,
            tabs
        } = this.state;

        const { canScrollLeft, canScrollRight } = this.canScroll(positionLeft);
        const isScrollable = this.isShouldScroll();

        return (
            <React.Fragment>
                <Wrapper spacing={spacing} innerRef={this.wrapperRef}>
                    <TabsWrapper innerRef={this.tabsWrapperRef} left={positionLeft}>
                        {
                            tabs.map(({ badge, id, title, subTabs }) => (
                                <TabWrapper
                                    active={id === activeTab}
                                    badge={badge}
                                    key={id}
                                    onClick={this.handleTabToggle(id)}
                                    onMouseEnter={this.handleItemHover(id)}
                                    onMouseLeave={this.handleItemHover()}
                                >
                                    <span>{title}</span>
                                    {
                                        !!subTabs.length && (
                                            <SubTabsWrapper active={(!tabHover || tabHover === id) && id === activeTab}>
                                                {
                                                    subTabs.map(({
                                                        badge: subTabBadge,
                                                        id: subTabId,
                                                        title: subTabTitle
                                                    }) => (
                                                        <SubTab
                                                            badge={subTabBadge}
                                                            active={subTabId === activeSubTab}
                                                            key={subTabId}
                                                            onClick={this.handleTabToggle(id, subTabId)}
                                                        >
                                                            {subTabTitle}
                                                        </SubTab>
                                                    ))
                                                }
                                            </SubTabsWrapper>
                                        )
                                    }
                                </TabWrapper>
                            ))
                        }
                    </TabsWrapper>
                    <Divider />
                    <ActionsWrapper isLeftSide>
                        {isScrollable &&
                            <ArrowButton
                                isDisabled={!canScrollLeft}
                                spacing="0 20px 0 0"
                                onClick={this.handleScrollLeft}
                            />
                        }
                    </ActionsWrapper>
                    <ActionsWrapper innerRef={this.actionsRef}>
                        {isScrollable &&
                            <ArrowButton
                                direction={ArrowButton.directions.right}
                                isDisabled={!canScrollRight}
                                onClick={this.handleScrollRight}
                            />
                        }
                        <SectionActions
                            actions={actions}
                            spacing="0"
                            withoutBorder
                        />
                    </ActionsWrapper>
                </Wrapper>
                {
                    children.map(child => (
                        <ChildWrapper isActive={child.props.id === activeTab} key={child.props.id}>
                            {
                                child.type.componentType === SubTabsType
                                    ? React.cloneElement(child, { isSubTab: true, activeTab: activeSubTab })
                                    : child
                            }
                        </ChildWrapper>
                    ))
                }
            </React.Fragment>
        );
    }
}

Tabs.defaultProps = defaultProps;
Tabs.propTypes = propTypes;

export default withRouter(Tabs);
