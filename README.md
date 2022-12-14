# <p align = "center"> Medcloud Development Challenge Two </p>


<p align="center">
 
</p>
 
<p align = "center">
   <img src="https://img.shields.io/badge/author-Samer Valente-4dae71?style=flat-square" />
   <img src="https://img.shields.io/badge/projeto-Medcloud Development Challenge Two-4dae71?style=flat-square" />
   
</p>


##  :clipboard: Descrição

Com o mundo cada vez mais tecnológico, precisamos tornar as informações que lidamos diariamente mais confiáveis, organizadas e dinâmicas. Sendo assim, este projeto possui como seu principal objetivo realizar todo o gerenciamento de pacientes cadastrados no sistema tal como registro, listagem, atualização e deleção de seus dados.

***

## :computer:	 Tecnologias e Conceitos

- REST APIs with API Gateway
- AWS Lambda for serveless
- DynamoDB as cloud database
- Node.js with express
- TypeScript
- React

***

## :rocket: Rotas

```yml
POST /patients
    - Rota para cadastrar um novo paciente
    - headers: {}
    - body:{
        "patientName": "Lorem ipsum",
        "email": "lorem@gmail.com",
        "birthDate": "DD/MM/AAAA",
        "cep":"12345-678",
        "uf":"SP",
        "city":"SP",
        "district":,"Sé",
        "publicPlace":"Praça da Sé",
        "complement":"lado ímpar"
}
```
    
```yml 
GET /patients
    - Rota para listar todos os pacientes
    - headers: null
    - body: null
```
    
```yml 
GET /patients/:id 
    - Rota para listar um usuário específico
    - headers: null
    - body: null
```

```yml
PATCH /patients/:id
    - Rota para atualizar os dados de um paciente
    - headers: null
    - body: {
       newPatientData: [
          {"updatekey":"updateValue"}
        ]
    }
``` 

```yml
DELETE /patients/:id
    - Rota para deletar um paciente pelo id
    - headers: null
    - body: null
```
***


Este projeto foi inicializado com o [Create React App](https://github.com/facebook/create-react-app), então certifique-se que voce tem a ultima versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.


