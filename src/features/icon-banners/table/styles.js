import styled from 'react-emotion';

const TableWrapper = styled.div`
    th:nth-child(1), td:nth-child(1) {
      width: 5%;
    }
    th:nth-child(2), td:nth-child(2) {
      padding-left: 20px;
      width: 5%;
    }
    th:nth-child(3), td:nth-child(3) {
      width: 10%;
    }
    th:nth-child(4), td:nth-child(4) {
      width: 20%;
      padding-right: 30px;
    }
    th:nth-child(5), td:nth-child(5) {
      width: 28%;
      padding-right: 30px;
    }
    th:nth-child(7), td:nth-child(7) {
      width: 10%;
    }
    th:nth-child(8), td:nth-child(8) {
      width: 100px;
    }
`;

export default TableWrapper;
