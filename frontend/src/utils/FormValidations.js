const validations = {
  patientName: {
    custom: {
      isValid: (value) => isValidString(value),
      message: "Digite um nome válido",
    },
  },

  email: {
    custom: {
      isValid: (value) => parseInt(value?.length, 10) >= 16,
      message: "Digite um email válido",
    },
  },

  birthDate: {
    custom: {
      isValid: (value) => parseInt(value?.length, 10) === 3,
      message: "Digite uma data de nascimento válida",
    },
  },

  address: {
    custom: {
      isValid: (value) =>
        value.match(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/),
      message: "Digite uma data de expiração válida",
    },
  },
};

export default validations;

function isValidString(value) {
  return value || value?.trim();
}
