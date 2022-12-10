import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 300px;

  div {
    display: flex;
    gap: 25px;
  }

  .emailEdit {
    align-items: center;

    .icon {
      font-size: 20px;
      cursor: pointer;
      transition: all linear 0.2s;
      border-radius: 4px;

      :hover {
        background-color: lightblue;
      }
    }

    .editIcon {
      color: blue;
    }

    .checkIcon{
      color:green;
    }

    .closeIcon {
      display: ${props => (props.isEmailEditing ? "none" : "block")};
      color: red;
    }
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
