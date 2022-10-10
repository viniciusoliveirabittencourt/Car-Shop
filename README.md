# Boas-vindas ao meu repositório do projeto Car Shop!

O projeto Car Shop foi o ultimo projeto do bloco de back-end da Trybe. Esse projeto foi a criação de dois simples CRUD, onde o objetivo foi testar se tinhamos absorvido todo o conhecimento envolvendo **MongoDB** e o ODM **Mongoose**, além de colocarmos em prática nossos conceitos de **POO** junto ao **Express** utilizando o **TypesScript**. Esse projeto é um servidor **Node.JS**, utilizando o framework **Express**, colocando em prática conceitos como **POO** e **CRUD**. Para o banco de dados, utilizamos **MongoDB** e para fazer a comunicação do servidor com o banco de dados, utilizamos o ODM **Mongoose**. Para além disso, também utilizamos o **Zod** para averiguar a padronização dos objetos que se irão se comunicar com o banco de dados. Os tests unitários são feitos utilizando o **Chai**, **Mocha** e **Sinon**. Tudo isso utilizando o amado TypeScript.

# Rodar localmente

> Utilizei o Ubuntu 20.04.4 LTS para realizar o projeto e escrever as instruções nesse README

Para rodar localmente o projeto, é necessário que se tenha no mínimo o Node.JS versão 16 ou superior; o NPM versão 8 ou superior; o git versã o 2 ou superior; e o mongodb-org versão 4.4.15 ou superior;

Siga o passo a passo para rodar localmente o projeto e testar os requisitos, caso deseje.

  1. Clone o repositório

  - `git clone git@github.com:viniciusoliveirabittencourt/Car-Shop.git`

  - Após isso, entre no diretório criado
    - `cd Car-Shop`

  2. Instale as dependências

  - `npm install`

  3. Rode o servidor Node.JS

  - `npm run dev`

> Verifique se o seu service mongod está rodando, para isso utilize `sudo service mongod status` caso n esteja tode o comando `sudo service mongod start`

  Pronto, agora vc já tem o servidor rodando em sua máquina local, podendo testar cada requisito enviando requisições pela sua plataforma preferida.

# Criação da estrutura de pastas inicial

1. Criar a pasta **src** na raiz do projeto para colocar toda a parte de código

2. Levar os arquivos **app.ts**, **index.ts** e **connection.ts** para dentro da pasta src

3. Modificar os scripts no **package.json** para indicar que os arquivos **app.ts**, **index.ts** e **connection.ts** agora estão dentro de **src**

4. Dentro da pasta **src** criar as principais pastas do modelo MSC: **models**, **services** e **controllers**

5. Após isso criar as pastas de suporte: **interfaces**, **routes**, **errors** e **tests**

6. Criar o arquivo **index.ts** dentro de **routes**, onde eu consigo ter um maior controle sobre minhas rotas

7. Já importar o **routes** no **app.ts** para facilitar a criação de rotas futuras

8. Dentro de **src/tests** eu vou criar as pastas **mocks** e **unit**

9. Dentro da pasta recém criada **unit**, vou criar uma pasta para cada pasta onde será realizado os tests unitários: **models**, **services** e **controllers**

# Requisitos

### 01 - Crie a interface `IModel` genérica

O objetivo é criar uma interface genérica chamada `IModel`, onde a mesma terá 5 funções `create()`, `read()`, `readOne()`, `update()` e `delete()`. `IModel` recebe um tipo genérico `T`. Cada função de `IModel` terá essas especificações:

 - `create()`: deve receber um objeto do tipo `T`e retornar uma Promise do tipo `T`.
 - `read()`: deve retornar uma Promise contendo um array de objetos do tipo `T`.
 - `readOne()`: deve receber uma string e retornar uma Promise do tipo `T` ou nula.
 - `update()`: deve receber uma string e um objeto do tipo `T` e retornar uma Promise do tipo `T` ou nula.
 - `delete()`: deve receber uma string e retornar uma Promise do tipo `T` ou nula.

Caso queira averiguar o requisito, pode ir em **src/interfaces/IModel.ts** e verificar a criação a interface

---

### 02 - Crie a interface `IVehicle` genérica

O objetivo aqui foi criar uma interface genérica chamada `IVehicle`, onde ela vai ser usada para conseguir moldar as propriedades dos nossos veículos. Utilizando o Zod, será possivel definir como essa interface deverá ser construída, quando sevida de modelo para outras interfaces.

Essa interface vai ter os seguintes atributos:

 - `model` onde o mesmo deve ser uma string com mais de 3 caracteres
 - `year` onde o mesmo deve ser um number maior ou igual a 1900 e menor ou igual a 2022
 - `color` onde o mesmo deve ser um uma string com mais de 3 caracteres
 - `status` onde o mesmo deve ser um boolean
 - `buyValue` onde o mesmo deve ser do tipo number e número inteiros

Caso queira averiguar o requisito, pode ir em **src/interfaces/IVehicle.ts** e verificar a criação a interface

---

### 03 - Crie a interface `ICar` a partir da interface `IVehicle`

O objetivo aqui foi criar uma interface `ICar` que extendia a interface `IVehicle`. A interface `ICar` vai ter todos os atributes de `IVehicle` mais os atributos a seguir:

  - `doorsQty` onde o mesmo deve ser um number, maior ou igual a dois e menor ou igual a quatro
  - `seatsQty` onde o mesmo deve ser um number, maior ou igual a dois e menor ou igual a sete

Esses atributos foram definidos usando o Zod

Caso queira averiguar o requisito, pode ir em **src/interfaces/ICar.ts** e verificar a criação a interface

---

### 04 - Crie uma rota para o endpoint `/cars` onde seja possível cadastrar um novo carro

O objetivo aqui foi criar um endpoint do tipo `POST` (`/cars`), onde o mesmo pudesse cadastrar um carro no banco de dados. Toda a lógica de verificação do body será realizada pelo `Zod`, onde irá caber apenas ao desenvolvedor verificar os retornos do mesmo. Caso o body seja passado corretamente, o retorna do endpoint será parecido com este:

  **_status http: `201`_**

  ```json
    {
      _id: "4edd40c86762e0fb12000003",
      model: "Ferrari Maranello",
      year: 1963,
      color: "red",
      buyValue: 3500000,
      seatsQty: 2,
      doorsQty: 2
    }
  ```

<details>
  <summary>Regras de négocio:</summary>

  <br />

  ## Regras de négocio para o endpoint `POST` `/cars`

  Caso a rota venha sem body ou com body vazio, o retorno do endpoint será o seguinte:
  **_status http: `400`_**

  ```json
    {}
  ```

  <br />

  Caso a chave `seatsQty` ou `doorsQty` menor que dois, o retorno do endpoint será o seguinte:
  **_status http: `400`_**

  ```json
    {}
  ```

  <br />

  Caso a rota venha sem as chaves `model`, `year`, `color`, `buyValue`, `doorsQty` e `seatsQty` menor que dois, o retorno do endpoint será o seguinte:
  **_status http: `400`_**

  ```json
    {}
  ```

  <br />

  Caso o tipo das chaves venham errados, o retorno do endpoint será o seguinte:
  **_status http: `400`_**

  ```json
    {}
  ```

</details>

Caso deseje testar colocar em prova o requisito, poderá realizar o passo a passo descrito em **Rodar localmente** e verificar a realizção do mesmo.

---

### 08 - Crie uma rota para o endpoint `/cars` onde seja possível listar todos os carros registrados

O objetivo aqui foi criar um endpoint `GET` (`/cars`), cujo o mesmo irá responder com uma lista dos carros no banco de dados, seu retorno sempre será um status http `200`, caso não tenha carros, o seu retorno será um array vazio, caso tenha será um array de `ICar`.

Caso deseje testar colocar em prova o requisito, poderá realizar o passo a passo descrito em **Rodar localmente** e verificar a realizção do mesmo.

---

### 09 - Crie uma rota para o endpoint `/cars/id` onde seja possível listar um único carro através do seu id

O objetivo aqui foi criar um endpoint `GET` (`/cars/id`), onde o mesmo irá retornar um status http `200` e o carro com o id correspondente.

<details>
  <summary>Regras de négocio:</summary>

  <br />

  Caso o id tenha menos de 24 caracteres, o retorno será um status http `400` com uma messagem `Id must have 24 hexadecimal characters`.

  Caso o id seja inválido, o retorno será um status http `404` com uma messagem `Object not found`.

</details>

Caso deseje testar colocar em prova o requisito, poderá realizar o passo a passo descrito em **Rodar localmente** e verificar a realizção do mesmo.

---

### 13 - Crie uma rota para o endpoint `/cars/id`, onde é possível atualizar o registro de um carro através do seu id

O objetivo aqui foi criar um endpoint `PUT` (`/cars/id`) para que seja possível atualizar o veículo do id correspondente, caso tudo esteja certo o endpoint irá retornar:

  **_status http: `200`_**

  ```JSON
    _id: "4edd40c86762e0fb12000003",
    model: "Fiat Uno",
    year: 1963,
    color: "blue",
    buyValue: 3500,
    seatsQty: 4,
    doorsQty: 4
  ```

<details>
  <summary>Regras de négocio:</summary>

  <br />

  Caso o id tenha menos de 24 caracteres, o retorno será um status http `400` com uma messagem `Id must have 24 hexadecimal characters`.

  Caso o id seja inválido, o retorno será um status http `404` com uma messagem `Object not found`.

  Caso o body venha vazio, o retorno será um status http `400` sem body.

</details>

Caso deseje testar colocar em prova o requisito, poderá realizar o passo a passo descrito em **Rodar localmente** e verificar a realizção do mesmo.

---

### 17 - Crie uma rota para o endpoint `/cars/id` para excluir os registros de um carro

O objetivo aqui foi criar um endpoint `DELETE` (`/cars/id`), onde o mesmo irá retornar um status http `204` sem body caso o carro com id correspondente seja realmente deletado.

<details>
  <summary>Regras de négocio:</summary>

  <br />

  Caso o id tenha menos de 24 caracteres, o retorno será um status http `400` com uma messagem `Id must have 24 hexadecimal characters`.

  Caso o id seja inválido, o retorno será um status http `404` com uma messagem `Object not found`.

</details>

Caso deseje testar colocar em prova o requisito, poderá realizar o passo a passo descrito em **Rodar localmente** e verificar a realizção do mesmo.

---

### 18 - Crie a interface `IMotorcycle` a partir da Interface `IVehicle`

O objetivo aqui foi criar uma interface `IMotorcycle` que extendia a interface `IVehicle`. A interface `IMotorcycle` vai ter todos os atributes de `IVehicle` mais os atributos a seguir:

  - `category` onde o mesmo deve ser um enum, com as opções `Street`, `Custom` ou `Trail`
  - `engineCapacity` onde o mesmo deve ser um number, positivo, menor ou igual a 2500

Esses atributos foram definidos usando o Zod

Caso queira averiguar o requisito, pode ir em **src/interfaces/IMotorcycle.ts** e verificar a criação a interface

---

### 19 - Crie uma rota para o endpoint `/motorcycles` onde seja possível cadastrar uma nova moto

O objetivo aqui foi criar um endpoint do tipo `POST` (`/motorcycles`), onde o mesmo pudesse cadastrar um carro no banco de dados. Toda a lógica de verificação do body será realizada pelo `Zod`, onde irá caber apenas ao desenvolvedor verificar os retornos do mesmo. Caso o body seja passado corretamente, o retorna do endpoint será parecido com este:

  **_status http: `201`_**

  ```json
    {
      _id: "4edd40c86762e0fb12000003",
      model: "Honda CG Titan 125",
      year: 1963,
      color: "red",
      buyValue: 3500,
      category: "Street",
      engineCapacity: 125
    }
  ```

<details>
  <summary>Regras de négocio:</summary>

  <br />

  ## Regras de négocio para o endpoint `POST` `/motorcycles`

  Caso a rota venha sem body ou com body vazio, o retorno do endpoint será o seguinte:
  **_status http: `400`_**

  ```json
    {}
  ```

  <br />

  Caso a chave `category` venha com algum outro valor diferente do enum já previsto, o retorno do enpoint será o seguinte:
  **_status http: `400`_**

  ```json
    {}
  ```

  <br />

  Caso a chave `engineCapacity`, seja menor ou igual a zero ou seja maior que **2500**, o retorno do endpoint será o seguinte:
  **_status http: `400`_**

  ```json
    {}
  ```

  <br />

  Caso a rota venha sem as chaves `model`, `year`, `color`, `buyValue`, `category` e `engineCapacity` menor que dois, o retorno do endpoint será o seguinte:
  **_status http: `400`_**

  ```json
    {}
  ```

  <br />

  Caso o tipo das chaves venham errados, o retorno do endpoint será o seguinte:
  **_status http: `400`_**

  ```json
    {}
  ```

</details>

Caso deseje testar colocar em prova o requisito, poderá realizar o passo a passo descrito em **Rodar localmente** e verificar a realizção do mesmo.

---

### 20 - Crie uma rota para o endpoint `/motorcycles` onde seja possível listar todas as motos registradas

O objetivo aqui foi criar um endpoint `GET` (`/motorcycles`), cujo o mesmo irá responder com uma lista dos carros no banco de dados, seu retorno sempre será um status http `200`, caso não tenha carros, o seu retorno será um array vazio, caso tenha será um array de `IMotorcycle`.

Caso deseje testar colocar em prova o requisito, poderá realizar o passo a passo descrito em **Rodar localmente** e verificar a realizção do mesmo.

---

### 21 - Crie uma rota para o endpoint `/motorcycles/id` onde seja possível listar uma única moto através do seu id

O objetivo aqui foi criar um endpoint `GET` (`/motorcycles/id`), onde o mesmo irá retornar um status http `200` e o carro com o id correspondente.

<details>
  <summary>Regras de négocio:</summary>

  <br />

  Caso o id tenha menos de 24 caracteres, o retorno será um status http `400` com uma messagem `Id must have 24 hexadecimal characters`.

  Caso o id seja inválido, o retorno será um status http `404` com uma messagem `Object not found`.

</details>

Caso deseje testar colocar em prova o requisito, poderá realizar o passo a passo descrito em **Rodar localmente** e verificar a realizção do mesmo.

---

### 22 - Crie uma rota para o endpoint `/motorcycles/id` onde é possível atualizar o registro de uma moto através do seu id

O objetivo aqui foi criar um endpoint `PUT` (`/motorcycles/id`) para que seja possível atualizar o veículo do id correspondente, caso tudo esteja certo o endpoint irá retornar:

  **_status http: `200`_**

  ```JSON
    {
      _id: "4edd40c86762e0fb12000003",
      model: "Honda CG Titan 125",
      year: 1963,
      color: "black",
      buyValue: 3500,
      category: "Street",
      engineCapacity: 125
    }
  ```

<details>
  <summary>Regras de négocio:</summary>

  <br />

  Caso o id tenha menos de 24 caracteres, o retorno será um status http `400` com uma messagem `Id must have 24 hexadecimal characters`.

  Caso o id seja inválido, o retorno será um status http `404` com uma messagem `Object not found`.

  Caso o body venha vazio, o retorno será um status http `400` sem body.

</details>

Caso deseje testar colocar em prova o requisito, poderá realizar o passo a passo descrito em **Rodar localmente** e verificar a realizção do mesmo.

---

### 23 - Crie uma rota para o endpoint `/motorcycles/id` para excluir os registros de uma moto

O objetivo aqui foi criar um endpoint `DELETE` (`/motorcycles/id`), onde o mesmo irá retornar um status http `204` sem body caso o carro com id correspondente seja realmente deletado.

<details>
  <summary>Regras de négocio:</summary>

  <br />

  Caso o id tenha menos de 24 caracteres, o retorno será um status http `400` com uma messagem `Id must have 24 hexadecimal characters`.

  Caso o id seja inválido, o retorno será um status http `404` com uma messagem `Object not found`.

</details>

Caso deseje testar colocar em prova o requisito, poderá realizar o passo a passo descrito em **Rodar localmente** e verificar a realizção do mesmo.

---
