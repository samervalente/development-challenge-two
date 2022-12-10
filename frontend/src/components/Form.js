import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 50%;

  div {
    display: flex;
    gap: 25px;
  }

  .birthDateSection {
    display: flex;

    flex-direction: column;

    input {
      height: 40px;
      width: 150px;
      border-radius: 5px;
      border: 1px solid gray;
      color: #016ea5;
      cursor: pointer;
      padding: 10px;

      :focus {
        border: 1px solid blue;
      }
    }

    label {
      color: gray;
    }
  }
`;

export default StyledForm;
