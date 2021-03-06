<h1># TestCloudDistrict</h1>

<div>Tiempo horas invertidas 7hs.</div>
<div>Usamos para el ejemplo en local el Host: localhost:3000</div>
<div>La DB esta en Heroku con un pgsql</div>
<div>El backEnd esta hecho en nodejs con express.</div>


<hr>

<h3>Tables:</h3>
<br>
<p>
CREATE TABLE user_groups(
	id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	"deletedAt" timestamptz DEFAULT NULL
)
</p>
<br>
<p>
CREATE TABLE users(
	id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    id_group INTEGER NOT NULL DEFAULT 9,
    status BOOLEAN NOT NULL DEFAULT TRUE,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	"deletedAt" timestamptz DEFAULT NULL,
    CONSTRAINT fk_user_group
		FOREIGN KEY(id_group) 
			REFERENCES user_groups(id)	
)
</p>
<br>
<p>
CREATE TABLE products(
	id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    base_price FLOAT,
    final_price FLOAT,
    iva FLOAT,
    id_user_creator BIGINT NOT NULL,
    available BOOLEAN NOT NULL DEFAULT TRUE,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	"deletedAt" timestamptz DEFAULT NULL,	
	CONSTRAINT fk_user_creator
		FOREIGN KEY(id_user_creator) 
			REFERENCES users(id)
)
</p>

<hr>

<h3>Apis:</h3>
<br>
---------------------------------------  LogIn   ---------------------------------------<br>
<p>
Desc: Api a travez de la cual nos logueamos al sistema \n
Url: <Host>/api/v1/login \n
Request Type: GET \n
Entradas: JSON \n
  -mail : (string)
  -password (string)
Respuesta \n
{
    "success": true,
    "data": {
        "user": {
            "id": 1,
            "name": "Gerardo Rodriguez",
            "mail": "leorodri85@gmail.com",
            "status": true,
            "id_group": 0,
            "createdAt": "2021-08-07T19:26:48.000Z",
            "updatedAt": "2021-08-08T03:44:18.446Z",
            "deletedAt": null
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mjg1NDk0NjAsInVzZXIiOnsiaWQiOjEsIm5hbWUiOiJHZXJhcmRvIFJvZHJpZ3VleiIsIm1haWwiOiJsZW9yb2RyaTg1QGdtYWlsLmNvbSIsInN0YXR1cyI6dHJ1ZSwiaWRfZ3JvdXAiOjAsImNyZWF0ZWRBdCI6IjIwMjEtMDgtMDdUMTk6MjY6NDguMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDgtMDhUMDM6NDQ6MTguNDQ2WiIsImRlbGV0ZWRBdCI6bnVsbH0sImlhdCI6MTYyODUxMzQ2MH0.SNL6ekONNBRzDtZzP9QyM6AP4lKJldesRD7MCWIdWw4"
    }
} \n
Error \n
{
	"success": false,
	"err": (string)
}
</p>
----------------------------------------------------------------------------------------
<br>

---------------------------------------  User List   ---------------------------------------<br>
<p>
Desc: Listamos los usuarios paginando los resultados
Url: <Host>/api/v1/user
Params: {
	page: (integer),
	limit: (integer),
	name: (string)
}
Request Type: GET
Header Bearer Token (obtenido en log in)
Respuesta
{
    "success": true,
    "data": {
        "count": 3,
        "rows": [
            {
                "id": 2,
                "name": "Test Admin",
                "mail": "admin@admin.com",
                "status": true,
                "id_group": 0,
                "createdAt": "2021-08-08T03:24:50.122Z",
                "updatedAt": "2021-08-08T03:24:50.122Z",
                "deletedAt": null
            },
            {
                "id": 8,
                "name": "Test Operator2",
                "mail": "operator2@operator.com",
                "status": true,
                "id_group": 1,
                "createdAt": "2021-08-09T13:04:46.818Z",
                "updatedAt": "2021-08-09T13:04:46.818Z",
                "deletedAt": null
            },
            {
                "id": 1,
                "name": "Test Operator",
                "mail": "operator@operator.com",
                "status": false,
                "id_group": 1,
                "createdAt": "2021-08-07T19:26:48.000Z",
                "updatedAt": "2021-08-09T13:15:06.972Z",
                "deletedAt": null
            }
        ]
    }
}
Error
{
	"success": false,
	"err": (string)
}
</p>
----------------------------------------------------------------------------------------
<br>

---------------------------------------  User Find   ---------------------------------------<br>
<p>
Desc: Busco un usuario en particular
Url: <Host>/api/v1/user/<id_user>
Request Type: GET
Header Bearer Token (obtenido en log in)
Respuesta
{
    "success": true,
    "data": {
        "id": 1,
        "name": "Test Operator",
        "mail": "operator@operator.com",
        "status": false,
        "id_group": 1,
        "createdAt": "2021-08-07T19:26:48.000Z",
        "updatedAt": "2021-08-09T13:15:06.972Z",
        "deletedAt": null
    }
}
Error
{
	"success": false,
	"err": (string)
}
</p>
----------------------------------------------------------------------------------------
<br>
---------------------------------------  User Create   ---------------------------------------<br>
<p>

Desc: Creamos usuarios, 
Url: <Host>/api/v1/user
Request Type: POST
Header Bearer Token (obtenido en log in)
Entradas: JSON
{
	"name": (string),
    "mail": (string),
    "password": (string),
    "id_group": (integer),
}
Respuesta
{
    "success": true,
    "data": {
        "id": 8,
        "name": "Test Operator2",
        "mail": "operator2@operator.com",
        "id_group": 1,
        "status": true,
        "updatedAt": "2021-08-09T13:04:46.818Z",
        "createdAt": "2021-08-09T13:04:46.818Z",
        "deletedAt": null
    }
}
Error
{
	"success": false,
	"err": (string)
}
</p>
----------------------------------------------------------------------------------------
<br>

---------------------------------------  User Edit   ---------------------------------------<br>
<p>
Desc: Editamos usuarios, 
Url: <Host>/api/v1/user/<id_usuario>
Request Type: PUT
Header Bearer Token (obtenido en log in)
Entradas: JSON
{
	"name": (string),
    "mail": (string),
    "password": (string),
    "id_group": (integer),
	"status": (boolean)
}
Respuesta
{
    "success": true,
    "data": {
        "id": 1,
        "name": "Test Operator",
        "mail": "operator@operator.com",
        "status": false,
        "id_group": 1,
        "createdAt": "2021-08-07T19:26:48.000Z",
        "updatedAt": "2021-08-09T13:15:06.972Z",
        "deletedAt": null
    }
}
Error
{
	"success": false,
	"err": (string)
}
</p>
----------------------------------------------------------------------------------------
<br>

---------------------------------------  User Delete   ---------------------------------------<br>
<p>
Desc: Borramos usuarios, 
Url: <Host>/api/v1/user/<id_usuario>
Request Type: DELETE
Header Bearer Token (obtenido en log in)
Respuesta
{
    "success": true,
    "data": {
        "id": 3,
        "name": "Test Operator",
        "mail": "operator@operator.com",
        "status": true,
        "id_group": 1,
        "createdAt": "2021-08-08T03:25:14.832Z",
        "updatedAt": "2021-08-09T13:20:42.935Z",
        "deletedAt": "2021-08-09T13:20:42.934Z"
    }
}
Error
{
	"success": false,
	"err": (string)
}
</p>
----------------------------------------------------------------------------------------



---------------------------------------  Products List   ---------------------------------------<br>

<p>

Desc: Listamos los productos paginando los resultados y aplicando el filtro de name, 
Url: <Host>/api/v1/product
Params: {
	page: (integer),
	limit: (integer),
	name: (string)
}
Request Type: GET
Header Bearer Token (obtenido en log in)
Respuesta
{
    "success": true,
    "data": {
        "count": 2,
        "rows": [
            {
                "id": 1,
                "name": "Samsung s10",
                "description": "Mobil Alta gama",
                "base_price": 800,
                "final_price": 880,
                "iva": 10,
                "available": false,
                "id_user_creator": "1",
                "createdAt": "2021-08-09T11:40:42.895Z",
                "updatedAt": "2021-08-09T12:33:59.600Z",
                "deletedAt": null
            },
            {
                "id": 3,
                "name": "Samsung s10e",
                "description": "Mobil Alta gama",
                "base_price": 900,
                "final_price": 1089,
                "iva": 21,
                "available": true,
                "id_user_creator": "1",
                "createdAt": "2021-08-09T13:50:51.281Z",
                "updatedAt": "2021-08-09T13:50:51.281Z",
                "deletedAt": null
            }
        ]
    },
    "filters": {
        "page": "1",
        "limit": "3",
        "name": null
    }
}
Error
{
	"success": false,
	"err": (string)
}
</p>
----------------------------------------------------------------------------------------
<br>

---------------------------------------  Products Find   ---------------------------------------<br>
<p>

Desc: Busco un product en particular
Url: <Host>/api/v1/product/<id_user>
Request Type: GET
Header Bearer Token (obtenido en log in)
Respuesta
{
    "success": true,
    "data": {
        "id": 3,
        "name": "Samsung s10e",
        "description": "Mobil Alta gama",
        "base_price": 900,
        "final_price": 1089,
        "iva": 21,
        "available": true,
        "id_user_creator": "1",
        "createdAt": "2021-08-09T13:50:51.281Z",
        "updatedAt": "2021-08-09T13:50:51.281Z",
        "deletedAt": null
    }
}
Error
{
	"success": false,
	"err": (string)
}
</p>
----------------------------------------------------------------------------------------
<br>

---------------------------------------  Producto Create   ---------------------------------------<br>
<p>

Desc: Creamos producto, 
Url: <Host>/api/v1/product
Request Type: POST
Header Bearer Token (obtenido en log in)
Entradas: JSON
{
    "name": (string),
    "description": (string),
    "base_price": (float),
    "iva": (float)
}
Respuesta
{
    "success": true,
    "data": {
        "id": 3,
        "name": "Samsung s10e",
        "description": "Mobil Alta gama",
        "base_price": 900,
        "iva": 21,
        "final_price": 1089,
        "available": true,
        "id_user_creator": "1",
        "updatedAt": "2021-08-09T13:50:51.281Z",
        "createdAt": "2021-08-09T13:50:51.281Z",
        "deletedAt": null
    }
}
Error
{
	"success": false,
	"err": (string)
}
</p>
----------------------------------------------------------------------------------------
<br>

---------------------------------------  Producto Edit   ---------------------------------------<br>
<p>

Desc: Editamos Productos, 
Url: <Host>/api/v1/product/<id_producto>
Request Type: PUT
Header Bearer Token (obtenido en log in)
Entradas: JSON
{
    "name": (string),
    "description": (string),
    "base_price": (float),
    "iva": (float),
    "available": (boolean),
}
Respuesta
{
    "success": true,
    "data": {
        "id": 1,
        "name": "Samsung s10",
        "description": "Mobil Alta gama",
        "base_price": "800.00",
        "final_price": "880.00",
        "iva": "10.00",
        "available": false,
        "id_user_creator": "1",
        "createdAt": "2021-08-09T11:40:42.895Z",
        "updatedAt": "2021-08-09T13:54:15.114Z",
        "deletedAt": null
    }
}
Error
{
	"success": false,
	"err": (string)
}

</p>
----------------------------------------------------------------------------------------
<br>

---------------------------------------  Producto Delete   ---------------------------------------<br>
<p>

Desc: Borramos Producto, 
Url: <Host>/api/v1/product/<id_producto>
Request Type: DELETE
Header Bearer Token (obtenido en log in)
Respuesta
{
    "success": true,
    "data": {
        "id": 1,
        "name": "Samsung s10",
        "description": "Mobil Alta gama",
        "base_price": 800,
        "final_price": 880,
        "iva": 10,
        "available": false,
        "id_user_creator": "1",
        "createdAt": "2021-08-09T11:40:42.895Z",
        "updatedAt": "2021-08-09T13:56:05.571Z",
        "deletedAt": "2021-08-09T13:56:05.571Z"
    }
}
Error
{
	"success": false,
	"err": (string)
}
</p>
----------------------------------------------------------------------------------------
<br>