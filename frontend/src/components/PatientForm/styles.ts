import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  .form-container {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  @media (max-width: 600px) {
    .form-container {
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
      gap: 0px;

      overflow-x: scroll;
    }
  }
`;

export default StyledForm;
