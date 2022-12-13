import axios from "axios";
import { toast } from "react-toastify";

async function getStates() {
  try {
    const { data } = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
    );
    return data;
  } catch (error) {
    toast.error("Não foi possível listar os estados solicitados.");
    return { error };
  }
}

async function getPatientAddress(cep) {
  try {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return data;
  } catch (error) {
    return { error };
  }
}

function onBlurCep(ev, setFieldValue) {
  const { value } = ev.target;

  const cep = value?.replace(/[^0-9]/g, "");

  if (cep?.length !== 8) {
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((res) => res.json())
    .then((data) => {
      if (!data.erro) {
        setFieldValue("publicPlace", data.logradouro);
        setFieldValue("district", data.bairro);
        setFieldValue("city", data.localidade);
        setFieldValue("uf", data.uf);
        setFieldValue("complement", data.complemento);
      }
    });
}

export { getStates, getPatientAddress, onBlurCep };
