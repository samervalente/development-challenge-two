import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  gap: 60px;
  width: 100%;

  .emailEdit {
    align-items: center;
    display: flex;
    width: 300px;
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

    .checkIcon {
      color: green;
    }

    .closeIcon {
      display: ${(props) => (props.isEmailEditing ? "none" : "block")};
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
      margin-bottom: 10px;
    }
  }
`;

export default StyledForm;
