import styled from 'react-emotion';

const TableWrapper = styled.div`
    th:nth-child(1), td:nth-child(1) {
      width: 5%;
    }
    th:nth-child(2), td:nth-child(2) {
      padding-left: 32px;
      width: 10%;
    }
    th:nth-child(3), td:nth-child(3) {
      width: 25%;
    }
    th:nth-child(4), td:nth-child(4) {
      width: 35%;
    }
`;

export default TableWrapper;
