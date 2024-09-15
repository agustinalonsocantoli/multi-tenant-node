# Multi-Tenant Project

Este proyecto es una implementación simple de una arquitectura multi-tenant utilizando Node.js y Express. Cada cliente tiene su propio esquema en una base de datos PostgreSQL compartida, asegurando que los datos se mantengan separados e individualizados. Además, incluye una serie de servicios para facilitar el desarrollo y las operaciones con la base de datos.

## **Dependencias**

### Dependencias de Desarrollo

Estas son las dependencias necesarias para el desarrollo del proyecto:

- `@babel/cli`
- `@babel/core`
- `@babel/node`
- `@babel/preset-env`
- `@babel/preset-typescript`
- `@eslint/js`
- `@types/cors`
- `@types/dotenv`
- `@types/express`
- `@types/helmet`
- `@types/jsonwebtoken`
- `@types/morgan`
- `@types/node`
- `@types/pg`
- `@types/sequelize`
- `babel-plugin-module-resolver`
- `eslint`
- `eslint-config-prettier`
- `eslint-plugin-prettier`
- `globals`
- `prettier`
- `ts-node-dev`
- `tsconfig-paths`
- `typescript`
- `typescript-eslint`

### Dependencias de Producción

Las siguientes dependencias son necesarias para la ejecución del proyecto:

- `argon`
- `cors`
- `dotenv`
- `express`
- `helmet`
- `install`
- `jsonwebtoken`
- `morgan`
- `pg`
- `pg-hstore`
- `sequelize`
- `zod`

## **Scripts del package.json**

El archivo `package.json` incluye los siguientes scripts para la administración del proyecto:

- **`dev`**: Ejecuta el servidor en modo de desarrollo.
  ```bash
  tsnd -r tsconfig-paths/register --respawn --ignore-watch node_modules src/server.ts
- **`build`**: Transpila el código TypeScript a JavaScript utilizando Babel.
    ```bash
    babel src --extensions ".ts,.js" --out-dir dist --copy-files
- **`start`**: Inicia el servidor con el código transpilado.
    ```bash
    node dist/server.js
## **Configuración Inicial**

Asegúrate de configurar los siguientes archivos antes de ejecutar el proyecto:

- **`tsconfig.json`**: Configuración de TypeScript.
- **`.eslintrc.json`**: Configuración de ESLint.
- **`.prettierrc`**: Configuración de Prettier.
- **`babel.config.js`**: Configuración de Babel.
- **`.gitignore`**: Archivos y carpetas que deben ser ignorados por Git.
- **`.env`**: Variables de entorno necesarias para la configuración del proyecto.

## **Estructura del Proyecto**

Dentro de la carpeta `config`, se incluyen los siguientes archivos:

- **`sequelize.ts`**: Instancia de la clase Sequelize con la configuración de la base de datos PostgreSQL.
- **`schema.ts`**: Verificación y creación del esquema, incluyendo migraciones y relaciones.
- **`loader.ts`**: Inicialización de Express y configuración de servicios integrados como CORS y Helmet. Además, inicializa las rutas.
- **`env.ts`**: Configuración para la exportación de las variables de entorno.
- **`database.ts`**: Configuración de la base de datos.

## **Características Destacadas**

- **Clase Query**: Un servicio que facilita las consultas a la base de datos, permitiendo aplicar métodos como `where`, `whereILike`, `preload` para precargar relaciones, `select`, y `exclude` para excluir datos de una forma mas dinamica.
  
- **Servicio Response**: Simplifica las respuestas HTTP, asignando automáticamente el estado y el contenido adecuado a cada código de respuesta.

- **Servicio Request**: Extrae el tenant de la URL de la solicitud para pasar a los modelos, permitiendo realizar consultas al esquema correspondiente.
  
- **Servicio Router**: Agrupa rutas con el mismo prefijo o middleware y permite llamar a los métodos de manera más rápida y cómoda en un solo lugar.

- **Servicio Validate**: Valida los datos obtenidos en las solicitudes, ya sea para crear o actualizar en la base de datos, asegurando la integridad y calidad de la información con la libreria ZOD para verificar el esquema.

## **Descripción del Proyecto**

Este proyecto proporciona una estructura básica para trabajar con multi-tenancy en Node.js y Express. Cada cliente tiene su propio esquema dentro de una base de datos compartida, permitiendo que los datos se mantengan separados e independientes. Los servicios creados facilitan las operaciones y simplifican el desarrollo, permitiendo una gestión eficiente de las solicit
