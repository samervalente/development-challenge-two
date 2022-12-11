import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  gap: 25px;
  width: 100%;

  .debounceInput {
    border-top-style: hidden;
    border-left-style: hidden;
    border-right-style: hidden;
    border-bottom-style: groove;
    border-bottom: 1px solid gray;
    padding: 0px 0px 15px 0px;
    font-size: 15px;
    font-family: "Roboto";

    :focus {
      outline: none;
    }
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
      margin: 0;
    }
  }
`;

export default StyledForm;
