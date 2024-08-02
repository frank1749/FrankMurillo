# Banco Productos - Proyecto Angular

Este es un proyecto Angular que implementa una tabla de productos con paginación y búsqueda utilizando Angular Material.

## Requisitos

- Node.js (versión 12 o superior)
- Angular CLI (versión 15 o superior)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/frank1749/FrankMurillo.git
   
   cd FrankMurillo

   npm install

## Ejecución

   ng serve

   La aplicación estará disponible en http://localhost:4200

## Estructura del proyecto

   src/
   |-- app/
   |   |-- services/
   |   |   |-- product.service.ts
   |   |-- interfaces/
   |   |   |-- product.interface.ts
   |   |-- shared/
   |   |   |-- header/
   |   |-- components/
   |   |   |-- product-form/
   |   |       |-- product-form.component.ts
   |   |       |-- product-form.component.html
   |   |       |-- product-form.component.scss
   |   |   |-- product-list/
   |   |       |-- product-list.component.ts
   |   |       |-- product-list.component.html
   |   |       |-- product-list.component.scss
   |   |-- app.module.ts
   |   |-- app.component.ts
   |   |-- app.component.html
   |-- environments/
   |   |-- environment.ts
   |   |-- environment.prod.ts
   |-- assets/
   |-- styles.scss

## Notas

   Cuando estes ejecutando el proyecto del backend procura que este "cors" dentro del método createExpressServer
   en el archivo "main.ts".



