
# Returnkey Test (Norman)

please follow the instruction below to run this project. This project is my answer for Returnkey Test.


## Preparation

Before Started make sure these tech stack installed in your computer:

 #### Node.js
  
  - for installation you can check [here](https://nodejs.org/en/download/)  
  #### PostgreSQL
  - install via brew
   ```bash
  $ brew install postgresql
```
  - run postgresql
   ```bash
  brew services start postgresql
```
 #### Postman
 for postman installation you can check [here](https://www.postman.com/downloads/) 
## Run the Project
- clone the Project
- install all dependencies
   ```bash
  $ npm install
    ```

- Configure Database
   ```bash
  $ npm run configure
    ```


## API Endpoints

#### Create Token 

```http
POST /pending/returns
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `order_id` | `string` | **Required**. order_id that can be seen in orders.csv |
| `email_address` | `string` | **Required**. use email from orders.csv |

#### Create Return

```http
POST /returns
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| token     | `string` | **Required**. use token from `/pending/returns` |



#### Get Return by ID

```http
GET /returns/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|    id  | `integer` |  |


#### Set QC Status
```http
PUT /returns/:id/items/:itemId/qc/status
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|    id  | `integer` |  |
|    itemId  | `string` |  SKU's ID|

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|    status  | `integer` | Only accept `ACCEPTED` & REJECTED|




## Related

Here are some other projects created by me for your references

[My Portfolio](https://fullstackkece.herokuapp.com/)

