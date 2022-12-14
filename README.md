# <p align = "center"> Medcloud Development Challenge Two </p>


<p align="center">
 
</p>
 
<p align = "center">
   <img src="https://img.shields.io/badge/author-Samer Valente-4dae71?style=flat-square" />
   <img src="https://img.shields.io/badge/projeto-Medcloud Development Challenge Two-4dae71?style=flat-square" />
   
</p>


##  :clipboard: Descrição

With the increasingly technological world, we need to make the information we deal with on a daily basis more reliable, organized and dynamic. Therefore, this project has as its main objective to carry out all the management of patients registered in the system, such as registration, listing, updating and deletion of their data.

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
    -Route to register a new patient
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
    - Route to list all patients
    - headers: null
    - body: null
```
    
```yml 
GET /patients/:id 
    - Route to list a specific patient
    - headers: null
    - body: null
```

```yml
PATCH /patients/:id
    - Route to update a patient data
    - headers: null
    - body: {
       newPatientData: [
          {"updatekey":"updateValue"}
        ]
    }
``` 

```yml
DELETE /patients
    - Route to delete patients
    - headers: null
    - body: {
     "patients:":[patientId, patientId, ...]
        }
```
***


Este projeto foi inicializado com o [Create React App](https://github.com/facebook/create-react-app), então certifique-se que voce tem a ultima versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.


