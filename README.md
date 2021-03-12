# FastFoodAPI
=============
__FastFoodAPI__: es una API que simula la generación de tickets en un restaurante. El modelo de negocio actualmente consiste en que el restaurante tiene una capacidad máxima de 6 mesas, llegado este tope no se permitirá ingresar al usuario. 

## How to run?

**FastFoodAPI** está desplegada a través de API Gateway, Lambda function y DynamoDB con Serverless de intermediario, por esta razón su ejecución no es local, sin embargo para los cambios a posteriores releases se es necesaria la ejecución del proyecto usando el comando `serverless deploy`, teniendo en cuenta las credenciales de AWS.

## Routes
Se tienen dos servicios generales, uno que actúa sobre el `menu` y el otro que actúa sobre el `ticket`.

### 1. Menu

- Creación de un menú: 
```javascript
 router.post('/api/fastfood/menu', menuController.create_menu);
```
    - Parámetros (body): 
    ```javascript 
    { menuName: S, menuPrice: N }
    ```

- Obtención de menús: 
```javascript 
router.get('/api/fastfood/menu', menuController.get_all_menus);
```
    - Parámetros: Ninguno

- Eliminación de un menú: 
```javascript 
router.delete('/api/fastfood/menu', menuController.delete_menu_by_id);
```
    - Parámetros (query): `MenuId`

### 2. Ticket

```javascript
router.post('/api/fastfood/ticket', ticketController.create_ticket);
router.get('/api/fastfood/ticket/table', ticketController.get_restaurant_table);
router.post('/api/fastfood/ticket/test', ticketController.test_implementation);
router.get('/api/fastfood/ticket', ticketController.get_tables_information)
router.delete('/api/fastfood/ticket', ticketController.remove_table);
```

__Ticket information__

- Creación de un ticket: 
```javascript
 router.post('/api/fastfood/ticket', ticketController.create_ticket); 
 ```
    - Parámetros (body): 
    ```javascript 
    { ccClient: S,  userNameClient: S }
    ```

- Obtención de una mesa (ticket): 
```javascript
 router.get('/api/fastfood/ticket/table', ticketController.get_restaurant_table); 
 ```
    - Parámetros (query): 
    ```javascript 
    { ccClient: S }
    ```

- Obtención de las mesas ocupadas (tickets): 
```javascript
 router.get('/api/fastfood/ticket', ticketController.get_tables_information)
 ```
    - Parámetros: Ninguno
    
- Eliminaciónd de una mesa (ticket): 
```javascript
 router.delete('/api/fastfood/ticket', ticketController.remove_table);
 ```
    - Parámetros (query): 
    ```javascript 
    { ccClient: S }
    ```

## Tests

FastFoodApi también cuenta con unas pruebas realizadas usando `mocha`, `supertest` y `chai`, para su ejecución basta con correr el comando `npm test`, no obstante como son pruebas siguiendo serverless, será necesario ejecutar el comando `sls offline start` para correr la función lambda localmente. 
