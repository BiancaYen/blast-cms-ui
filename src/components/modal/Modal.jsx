import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styles
import { CloseButtonWrapper, InnerWrapper, ModalWrapper } from './styles';

// Icons
import CloseIconRounded from '../icons/CloseIconRounded';

// Components
import IconAction from '../icon-action/IconAction';

// Default Props
const defaultProps = {
    isActive: false,
    onClose: () => {}
};

// Prop Types
const propTypes = {
    children: PropTypes.node.isRequired,
    isActive: PropTypes.bool,
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
            this.props.onClose();
        }
    };

    // Click method
    handleClose = ({ target }) => {
        this.innerWrapper.current.addEventListener('animationend', this.onAnimationEnd);
        if (target === this.outerWrapper.current) {
            this.props.onClose();
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
        if (this.props.isActive) {
            this.outerWrapper.current.focus();
        }
    }

    render() {
        const { isActive, children, onClose } = this.props;

        return (
            <ModalWrapper
                innerRef={this.outerWrapper}
                isActive={isActive}
                animationEnd={this.state.animationEnd}
                onKeyUp={this.handleKeyUp}
                onClick={this.handleClose}
            >
                <InnerWrapper innerRef={this.innerWrapper}>
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

export default Modal;
