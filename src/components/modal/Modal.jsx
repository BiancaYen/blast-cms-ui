import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Constants
import { sizes } from './constants';

// Styles
import { CloseButtonWrapper, InnerWrapper, ModalWrapper } from './styles';

// Icons
import CloseIconRounded from '../icons/CloseIconRounded';

// Components
import IconAction from '../icon-action/IconAction';

// Default Props
const defaultProps = {
    isActive: false,
    size: sizes.medium,
    onClose: () => {}
};

// Prop Types
const propTypes = {
    children: PropTypes.node.isRequired,
    isActive: PropTypes.bool,
    size: PropTypes.string,
    onClose: PropTypes.func
};

class Modal extends Component {
    state = {
        animationEnd: true
    };

    outerWrapper = React.createRef();

    innerWrapper = React.createRef();

    // Key method
    handleKeyUp = (event) => {
        if (event.keyCode === 27) {
            const { onClose } = this.props;
            onClose();
        }
    };

    // Click method
    handleClose = ({ target }) => {
        this.innerWrapper.current.addEventListener('animationend', this.onAnimationEnd);
        if (target === this.outerWrapper.current) {
            const { onClose } = this.props;
            onClose();
        }
    };

    onAnimationEnd = () => {
        this.setState({ animationEnd: true });
        this.innerWrapper.current.removeEventListener('animationend', this.onAnimationEnd);
    };

    static getDerivedStateFromProps(props, state) {
        if (props.isActive) {
            return {
                animationEnd: false
            };
        }
        return state;
    }

    componentDidUpdate() {
        const { isActive } = this.props;
        if (isActive) {
            this.outerWrapper.current.focus();
        }
    }

    render() {
        const { animationEnd } = this.state;
        const {
            isActive,
            children,
            size,
            onClose
        } = this.props;

        return (
            <ModalWrapper
                innerRef={this.outerWrapper}
                isActive={isActive}
                animationEnd={animationEnd}
                onKeyUp={this.handleKeyUp}
                onClick={this.handleClose}
            >
                <InnerWrapper innerRef={this.innerWrapper} size={size}>
                    {children}
                    <CloseButtonWrapper>
                        <IconAction icon={<CloseIconRounded />} onClick={() => onClose()}>
                            Close
                        </IconAction>
                    </CloseButtonWrapper>
                </InnerWrapper>
            </ModalWrapper>
        );
    }
}

Modal.defaultProps = defaultProps;
Modal.propTypes = propTypes;
Modal.sizes = sizes;

export default Modal;
