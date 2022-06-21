# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: /api/products[get]
- getOne: api/products/:id [get]
- showByCategory: api/products/category:category [get]
- Create: api/products [post]
- Delete: api/products/:id [delete]

#### Users
- Index: /api/users[get]
- getOne: api/user/:id[get]
- Create: api/users[post]
- Delete: api/users/:id[delete]

#### Orders
- index: api/orders[get]
- show: api/orders/:id [get]
- create: api/orders [post]
-currentOrders: api/orders/current[get]
-completedOrders: api/orders/completed

## Data Shapes
#### Product
-  id [SERIAL PRIMARY KEY]
- name [VARCHAR(50)]
- price [NUMERIC]
- [OPTIONAL] category [VARCHAR(50)]

#### User
- id[SERIAL PRIMARY KEY]
- firstName [VARCHAR(50)]
- lastName[VARCHAR(50)]
- password[VARCHAR(60)]

#### Orders
- id[SERIAL PRIMARY KEY]
- user_id[INTEGER]
- status of order [VARCHAR(20)] (active or complete)

#### Order_Product
- id[SERIAL PRIMARY KEY]
-quantity [INTEGER]
-user_id [INTEGER] REFERENCES orders(id)
-product_id [INTEGER] REFERENCES products(id)
