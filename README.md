# Frontend Angular JWT

Un proyecto Angular moderno que implementa un frontend para una API REST securizada con JWT, integrado con Maven para facilitar el desarrollo y despliegue.

## 🚀 Características Principales

- 🔐 **Autenticación JWT**: Sistema de login seguro con tokens JWT
- 🏠 **Panel Principal**: Vista home con acceso protegido a la API
- 🛡️ **Protección de Rutas**: AuthGuard para rutas privadas
- ❌ **Manejo de Errores**: Vista dedicada para errores de autorización
- 🎨 **UI Moderna**: Interfaz atractiva con Bootstrap 5 y animaciones CSS
- 📱 **Diseño Responsive**: Adaptable a diferentes dispositivos
- ⚡ **Integración Maven**: Build automatizado con frontend-maven-plugin
- 🔄 **Reactive Forms**: Formularios reactivos con validación

## 📋 Requisitos del Sistema

- **Node.js**: v18.17.0 o superior
- **npm**: v9.6.7 o superior
- **Angular CLI**: v16.2.0 o superior
- **Java**: 11+ (para Maven)
- **Maven**: 3.6+ 
- **IDE**: Eclipse IDE (recomendado) o VS Code

## 🏗️ Arquitectura del Proyecto

```
angular-jwt-frontend/
├── pom.xml                           # Configuración Maven
└── src/main/frontend/                # Aplicación Angular
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   ├── login/            # Componente de autenticación
    │   │   │   │   ├── login.component.ts
    │   │   │   │   ├── login.component.html
    │   │   │   │   └── login.component.css
    │   │   │   ├── home/             # Panel principal
    │   │   │   │   ├── home.component.ts
    │   │   │   │   ├── home.component.html
    │   │   │   │   └── home.component.css
    │   │   │   └── error/            # Página de errores
    │   │   │       ├── error.component.ts
    │   │   │       ├── error.component.html
    │   │   │       └── error.component.css
    │   │   ├── services/
    │   │   │   └── auth.service.ts   # Servicio de autenticación
    │   │   ├── guards/
    │   │   │   └── auth.guard.ts     # Guard de protección
    │   │   ├── app-routing.module.ts # Configuración de rutas
    │   │   ├── app.module.ts         # Módulo principal
    │   │   └── app.component.*       # Componente raíz
    │   ├── environments/             # Configuración de entornos
    │   │   ├── environment.ts        # Desarrollo
    │   │   └── environment.prod.ts   # Producción
    │   ├── styles.css               # Estilos globales
    │   └── index.html               # Página principal
    ├── package.json                 # Dependencias npm
    ├── angular.json                 # Configuración Angular
    └── tsconfig.json               # Configuración TypeScript
```

## ⚙️ Configuración del Proyecto

### 1. Clonar e Importar en Eclipse

```bash
# Clonar el repositorio
git clone <repository-url>
cd angular-jwt-frontend
```

**En Eclipse:**
1. `File > Import > Existing Maven Projects`
2. Seleccionar la carpeta del proyecto
3. Eclipse detectará automáticamente el `pom.xml`
4. Click en `Finish`

### 2. Instalación de Dependencias

**Opción A: Usando Maven (Recomendado)**
```bash
mvn clean compile
```

**Opción B: Manual**
```bash
cd src/main/frontend
npm install
```

### 3. Configuración de la API Backend

Verificar y ajustar la URL de la API en los archivos de configuración:

**`src/main/frontend/src/app/services/auth.service.ts`:**
```typescript
private readonly API_BASE_URL = 'http://localhost:8080/api';
```

**`src/main/frontend/src/environments/environment.ts`:**
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

## 🚀 Ejecución del Proyecto

### Modo Desarrollo

**Desde Eclipse:**
1. Click derecho en el proyecto
2. `Run As > Maven build...`
3. Goals: `frontend:npm@"npm run start"`

**Desde Terminal:**
```bash
cd src/main/frontend
ng serve
```

Aplicación disponible en: `http://localhost:4200`

### Build de Producción

**Maven (Integrado):**
```bash
mvn clean compile
```

**Angular CLI:**
```bash
cd src/main/frontend
ng build --configuration production
```

Los archivos compilados se generan en: `target/classes/static/`

## 📡 API Endpoints

### Autenticación
```http
POST /api/auth/login
Content-Type: application/json

{
  "userName": "usuario",
  "password": "contraseña"
}
```

**Respuesta exitosa:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Greetings (Protegido)
```http
GET /api/greetings
Authorization: Bearer <jwt_token>
```

## 🧩 Funcionalidades Detalladas

### 🔐 Sistema de Autenticación
- **Formularios Reactivos**: Validación en tiempo real
- **Almacenamiento Seguro**: Tokens en localStorage
- **Verificación de Expiración**: Validación automática de tokens
- **Manejo de Errores**: Mensajes descriptivos para el usuario

### 🏠 Panel Principal (Home)
- **Header Dinámico**: Título del proyecto y botón de logout
- **Consulta API**: Botón para llamar al endpoint de greetings
- **Visualización de Respuesta**: Headers HTTP y payload JSON formateados
- **Estados de Carga**: Indicadores visuales durante las peticiones
- **Footer Informativo**: Copyright dinámico

### 🛡️ Seguridad y Protección
- **AuthGuard**: Protección automática de rutas privadas
- **Interceptores**: Manejo centralizado de tokens
- **Redirección Inteligente**: Navegación automática según estado de autenticación
- **Limpieza de Sesión**: Logout automático en errores de autorización

### ❌ Manejo de Errores
- **Página Dedicada**: Vista específica para errores de acceso
- **Información Detallada**: Causas posibles del error
- **Recuperación Fácil**: Botón directo para volver al login
- **Limpieza Automática**: Eliminación de tokens inválidos

## 🎨 Tecnologías y Librerías

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Angular** | 16.2.0 | Framework frontend |
| **TypeScript** | 5.1.3 | Lenguaje de programación |
| **Bootstrap** | 5.3.7 | Framework CSS |
| **RxJS** | 7.8.0 | Programación reactiva |
| **Maven** | - | Gestión de build |
| **Node.js** | 18.17.0 | Runtime JavaScript |
| **npm** | 9.6.7 | Gestor de paquetes |

### Dependencias Clave
```json
{
  "@angular/core": "^16.2.0",
  "@angular/forms": "^16.2.0",
  "@angular/router": "^16.2.0",
  "@angular/common": "^16.2.0",
  "bootstrap": "^5.3.7",
  "rxjs": "~7.8.0"
}
```

## 🔧 Comandos Útiles

### Desarrollo
```bash
# Servidor de desarrollo
ng serve

# Build de desarrollo
ng build

# Tests unitarios
ng test

# Análisis de código
ng lint

# Actualizar dependencias
ng update
```

### Maven
```bash
# Build completo
mvn clean compile

# Solo instalar dependencias
mvn frontend:npm@"npm install"

# Solo build frontend
mvn frontend:npm@"npm run build"

# Limpiar proyecto
mvn clean
```

### Debugging
```bash
# Servidor con source maps
ng serve --source-map

# Build con análisis de bundle
ng build --stats-json
```

## 🔍 Solución de Problemas Comunes

### CORS Issues
Si experimentas problemas de CORS, verifica que tu backend tenga configurado:
```java
@CrossOrigin(origins = "http://localhost:4200")
```

### Token Expirado
La aplicación maneja automáticamente tokens expirados:
- Redirección automática al login
- Limpieza de localStorage
- Mensajes informativos al usuario

### Puerto Ocupado
Angular sugiere automáticamente un puerto alternativo:
```bash
Port 4200 is already in use. Would you like to use port 4201 instead? (Y/n)
```

### Problemas de Build
```bash
# Limpiar cache de npm
npm cache clean --force

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Build limpio con Maven
mvn clean compile
```

### Problemas de Dependencias
```bash
# Verificar vulnerabilidades
npm audit

# Aplicar correcciones automáticas
npm audit fix

# Actualizar Angular
ng update @angular/core @angular/cli
```

## 📊 Estructura de Estados de la Aplicación

```
Estados de Autenticación:
├── No Autenticado → /login
├── Autenticado → /home
├── Token Expirado → /login
└── Error de Autorización → /error

Flujo de Navegación:
Login → Home → [API Call] → Results
  ↓       ↓        ↓
Error ← Error ← Error (401/403)
```

## 🤝 Contribución

1. **Fork** del proyecto
2. **Crear** rama para nueva funcionalidad
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. **Commit** de cambios
   ```bash
   git commit -m 'Agregar nueva funcionalidad'
   ```
4. **Push** a la rama
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. **Abrir** Pull Request

### Estándares de Código
- Seguir las convenciones de Angular
- Documentar funciones públicas
- Incluir tests para nuevas funcionalidades
- Mantener consistencia en el estilo de código

## 📄 Licencia



## 👥 Equipo de Desarrollo

- **Frontend**: Angular 16 + TypeScript
- **Build System**: Maven + frontend-maven-plugin
- **UI/UX**: Bootstrap 5 + CSS custom
- **Security**: JWT Authentication

---

**¿Necesitas ayuda?** Abre un [issue](../../issues) o consulta la [documentación oficial de Angular](https://angular.io/docs).