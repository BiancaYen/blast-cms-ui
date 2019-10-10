import React from 'react';
import PropTypes from 'prop-types';

// Styled
import { Wrapper, ImageWrapper, ContentWrapper } from './styles';

// Default Props
const defaultProps = {
    spacing: '',
    text: ''
};

// Prop types
const propTypes = {
    children: PropTypes.node.isRequired,
    image: PropTypes.node.isRequired,
    spacing: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string.isRequired
};

const Board = ({ children, image, spacing, text, title }) => (
    <Wrapper spacing={spacing}>
        <ImageWrapper>
            <div>
                {image}
            </div>
        </ImageWrapper>
        <ContentWrapper>
            <h1>{title}</h1>
            {text && <p>{text}</p>}
            {children}
        </ContentWrapper>
    </Wrapper>
);

Board.defaultProps = defaultProps;
Board.propTypes = propTypes;

export default Board;
