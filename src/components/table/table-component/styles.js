import styled from 'react-emotion';

// Utils
import getTheme from '../../../utils/getTheme';

// Styles
import Cell from '../cell/styles';

const getProperty = getTheme('table');

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    
    margin: ${({ spacing }) => spacing || '20px 0 5px 0'};
`;

const ControlsWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    
    &> div:first-of-type {
        width: initial;
        flex-grow: 1;
    }
`;

const TableWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 50, 0.1);
    
    min-height: ${({ minHeight }) => minHeight || 'none'}px;
    border: 1px solid ${getProperty('borderColor')};
    background-color: ${getProperty('background')};
    
    table {
        border-collapse: collapse;
        width: 100%;
        min-height: ${({ minHeight }) => minHeight || 'none'}px;
        
        thead tr th {
            border: none;
            
            &:first-of-type {
                border-top-left-radius: 5px;
            }
            
            &:last-of-type {
                border-top-right-radius: 5px;
            }
        }
        
        tbody tr:last-of-type {
            td {
                border: none;
                
                &:first-of-type {
                    border-bottom-left-radius: 5px;
                }
                
                &:last-of-type {
                    border-bottom-right-radius: 5px;
                }
            }
        }
    }
`;

const SpinnerWrapper = styled.div`
    position: absolute;
    z-index: 5;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, .65);
`;

const CellPlaceholder = styled(Cell)`
    min-height: ${({ minHeight }) => minHeight}px;
`;

export {
    CellPlaceholder,
    ControlsWrapper,
    SpinnerWrapper,
    TableWrapper,
    Wrapper
};
