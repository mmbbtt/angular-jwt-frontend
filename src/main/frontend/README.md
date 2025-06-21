# Frontend Angular JWT

Este es un proyecto Angular que implementa un frontend para una API REST securizada con JWT.

## Características

- 🔐 **Autenticación JWT**: Login seguro con tokens JWT
- 🏠 **Vista Home**: Panel principal con acceso a la API
- ❌ **Manejo de errores**: Vista de error para accesos no autorizados
- 🎨 **UI moderna**: Interfaz atractiva con Bootstrap 5
- 🛡️ **Guard de rutas**: Protección de rutas con AuthGuard
- 📱 **Responsive**: Diseño adaptable a diferentes dispositivos

## Estructura del Proyecto

```
src/main/frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── login/          # Componente de login
│   │   │   ├── home/           # Componente principal
│   │   │   └── error/          # Componente de error
│   │   ├── services/
│   │   │   └── auth.service.ts # Servicio de autenticación
│   │   ├── guards/
│   │   │   └── auth.guard.ts   # Guard de autenticación
│   │   ├── app-routing.module.ts
│   │   ├── app.module.ts
│   │   └── app.component.*
│   ├── environments/           # Configuración de entornos
│   ├── index.html
│   └── styles.css
├── package.json
├── angular.json
└── tsconfig.json
```

## Requisitos Previos

- Node.js (versión 18 o superior)
- npm (versión 9 o superior)
- Angular CLI (versión 16 o superior)
- Java 11+ (para Maven)
- Eclipse IDE

## Configuración en Eclipse

### 1. Importar como Proyecto Maven

1. Abre Eclipse IDE
2. Ve a `File > Import > Existing Maven Projects`
3. Selecciona la carpeta raíz del proyecto
4. Eclipse detectará automáticamente el `pom.xml`
5. Haz clic en `Finish`

### 2. Estructura de Directorios

Asegúrate de que tu proyecto tenga esta estructura:

```
angular-jwt-frontend/
├── pom.xml
└── src/
    └── main/
        └── frontend/           # Coloca aquí todos los archivos Angular
            ├── package.json
            ├── angular.json
            ├── tsconfig.json
            └── src/
                ├── app/
                ├── environments/
                ├── index.html
                └── styles.css
```

## Instalación y Configuración

### 1. Instalar Dependencias

Desde Eclipse o terminal, navega a `src/main/frontend/` y ejecuta:

```bash
npm install
```

### 2. Configurar la API

Verifica que la URL de tu API en `src/app/services/auth.service.ts` sea correcta:

```typescript
private readonly API_BASE_URL = 'http://localhost:8080/api';
```

### 3. Ejecutar en Desarrollo

Para desarrollo, ejecuta desde `src/main/frontend/`:

```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

### 4. Build con Maven

Para hacer build completo desde Eclipse:

1. Clic derecho en el proyecto
2. `Run As > Maven build...`
3. Goals: `clean compile`
4. Run

O desde terminal:

```bash
mvn clean compile
```

## Endpoints de la API

### Login
- **URL**: `http://localhost:8080/api/auth/login`
- **Método**: POST
- **Body**:
```json
{
  "userName": "tu_usuario",
  "password": "tu_contraseña"
}
```
- **Respuesta**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Greetings
- **URL**: `http://localhost:8080/api/greetings`
- **Método**: GET
- **Headers**: `Authorization: Bearer <jwt_token>`

## Funcionalidades

### 1. Vista de Login
- Formulario reactivo con validaciones
- Manejo de errores de autenticación
- Redirección automática si ya está autenticado

### 2. Vista Home
- Header con título y botón de logout
- Botón para consultar API de greetings
- Visualización de respuesta (headers y payload)
- Footer con copyright

### 3. Vista de Error
- Información sobre acceso denegado
- Botón para volver al login
- Lista de posibles causas del error

### 4. Seguridad
- Tokens JWT almacenados en localStorage
- Verificación de expiración de tokens
- Guard que protege rutas privadas
- Logout automático en caso de token inválido

## Comandos Útiles

### Desarrollo
```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
ng serve

# Build de desarrollo
ng build

# Tests
ng test
```

### Maven
```bash
# Build completo
mvn clean compile

# Solo frontend
mvn frontend:npm@"npm install"
mvn frontend:npm@"npm run build"
```

## Solución de Problemas

### CORS
Si tienes problemas de CORS, asegúrate de que tu API backend tenga configurado:
```java
@CrossOrigin(origins = "http://localhost:4200")
```

### Token Expirado
La aplicación maneja automáticamente tokens expirados y redirige al login.

### Puerto Ocupado
Si el puerto 4200 está ocupado, Angular te sugerirá otro puerto automáticamente.

## Tecnologías Utilizadas

- **Angular 16**: Framework frontend
- **TypeScript**: Lenguaje de programación
- **Bootstrap 5**: Framework CSS
- **RxJS**: Programación reactiva
- **JWT**: Autenticación
- **Maven**: Gestión de build
- **Font Awesome**: Iconos (CDN)

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## Licencia


