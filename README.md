# FastFoodAPI
=============
__FastFoodAPI__: es una API que simula la generación de tickets en un restaurante. El modelo de negocio actualmente consiste en que el restaurante tiene una capacidad máxima de 6 mesas, llegado este tope no se permitirá ingresar al usuario. 

## Routes
Se tienen dos servicios generales, uno que actúa sobre el `menu` y el otro que actúa sobre el `ticket`.

### 1. Menu
===========

- Creación de un menú: ```javascript router.post('/api/fastfood/menu', menuController.create_menu); ```
    - Parámetros (body): ```javascript menuName: S, menuPrice: N ```
- Obtención de menús: ```javascript router.get('/api/fastfood/menu', menuController.get_all_menus);```
    - Parámetros: Ninguno
- Eliminación de un menú: ```javascript router.delete('/api/fastfood/menu', menuController.delete_menu_by_id);```
    - Parámetros (query): `MenuId`

### 2. Ticket
============

```javascript
router.post('/api/fastfood/ticket', ticketController.create_ticket);
router.get('/api/fastfood/ticket/table', ticketController.get_restaurant_table);
router.post('/api/fastfood/ticket/test', ticketController.test_implementation);
router.get('/api/fastfood/ticket', ticketController.get_tables_information)
router.delete('/api/fastfood/ticket', ticketController.remove_table);
```

__Information__

