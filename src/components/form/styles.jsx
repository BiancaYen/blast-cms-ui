import styled from 'react-emotion';

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    margin: ${({ spacing }) => spacing || '0'};
    padding ${({ spacingContent }) => spacingContent || '0'};
`;

export default FormWrapper;
