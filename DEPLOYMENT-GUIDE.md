# Guía de Despliegue - Aplicación Angular JWT

Esta guía te permitirá ejecutar la aplicación Angular JWT desde la carpeta de distribución compilada.

## 📋 Requisitos del Sistema

### Requisitos Mínimos
- **Sistema Operativo**: Windows 10+, macOS 10.14+, Ubuntu 18.04+ o cualquier distribución Linux moderna
- **Memoria RAM**: 2 GB mínimo, 4 GB recomendado
- **Espacio en disco**: 100 MB para la aplicación + espacio para servidor web
- **Navegador web moderno**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Requisitos de Red
- **Puerto disponible**: Puerto 4200 (configurable)
- **Conectividad**: Acceso a la API backend (por defecto `http://localhost:8080/api`)
- **CORS**: El backend debe permitir conexiones desde el puerto del frontend

## 📁 Estructura de Archivos Distribuidos

Al recibir la aplicación, deberías tener esta estructura:

```
angular-jwt-app/
├── index.html              # Página principal
├── main.js                 # Código principal de la aplicación
├── polyfills.js           # Polyfills para compatibilidad
├── runtime.js             # Runtime de Angular
├── styles.css             # Estilos compilados
├── favicon.ico            # Icono de la aplicación
└── assets/                # Recursos estáticos (si los hay)
    └── (archivos de recursos)
```

## 🚀 Métodos de Ejecución

### Opción 1: Node.js + http-server (Recomendado)

#### Requisitos
- **Node.js**: v14.0 o superior
- **npm**: v6.0 o superior

#### Pasos de Instalación

1. **Verificar Node.js**
   ```bash
   node --version
   npm --version
   ```

2. **Instalar http-server**
   ```bash
   npm install -g http-server
   ```

3. **Navegar a la carpeta de la aplicación**
   ```bash
   cd path/to/angular-jwt-app
   ```

4. **Ejecutar la aplicación**
   ```bash
   http-server -p 4200 -c-1
   ```

5. **Acceder a la aplicación**
   - Abrir navegador en: `http://localhost:4200`

#### Opciones de Configuración
```bash
# Puerto personalizado
http-server -p 8080 -c-1

# Permitir acceso desde otras IPs
http-server -p 4200 -c-1 -a 0.0.0.0

# Con CORS habilitado
http-server -p 4200 -c-1 --cors
```

### Opción 2: Python (Sin instalaciones adicionales)

#### Requisitos
- **Python**: v3.6+ (generalmente preinstalado en Linux/macOS)

#### Pasos de Ejecución

1. **Verificar Python**
   ```bash
   python3 --version
   # o en Windows:
   python --version
   ```

2. **Navegar a la carpeta de la aplicación**
   ```bash
   cd path/to/angular-jwt-app
   ```

3. **Ejecutar servidor HTTP**
   ```bash
   # Python 3
   python3 -m http.server 4200
   
   # Windows con Python 3
   python -m http.server 4200
   ```

4. **Acceder a la aplicación**
   - Abrir navegador en: `http://localhost:4200`

### Opción 3: serve (Moderno y eficiente)

#### Requisitos
- **Node.js**: v14.0 o superior

#### Pasos de Instalación

1. **Instalar serve**
   ```bash
   npm install -g serve
   ```

2. **Navegar a la carpeta de la aplicación**
   ```bash
   cd path/to/angular-jwt-app
   ```

3. **Ejecutar la aplicación**
   ```bash
   serve -s . -l 4200
   ```

### Opción 4: live-server (Con recarga automática)

#### Requisitos
- **Node.js**: v14.0 o superior

#### Pasos de Instalación

1. **Instalar live-server**
   ```bash
   npm install -g live-server
   ```

2. **Navegar a la carpeta de la aplicación**
   ```bash
   cd path/to/angular-jwt-app
   ```

3. **Ejecutar la aplicación**
   ```bash
   live-server --port=4200 --host=localhost
   ```

## 🔧 Configuración del Backend

### Verificar Conectividad API

La aplicación está configurada para conectarse a:
```
http://localhost:8080/api
```

#### Endpoints Requeridos:
- `POST /api/auth/login` - Autenticación
- `GET /api/greetings` - Servicio protegido

### Configurar CORS en el Backend

Tu backend debe permitir conexiones desde el frontend. Ejemplo para Spring Boot:

```java
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ApiController {
    // Tu código aquí
}
```

## 🌐 Acceso desde Otras Computadoras

### Opción Local Network

1. **Obtener tu IP local**
   ```bash
   # Windows
   ipconfig
   
   # Linux/macOS
   ifconfig
   # o
   ip addr show
   ```

2. **Ejecutar servidor con acceso externo**
   ```bash
   # http-server
   http-server -p 4200 -c-1 -a 0.0.0.0
   
   # Python
   python3 -m http.server 4200 --bind 0.0.0.0
   ```

3. **Acceso desde otros dispositivos**
   - URL: `http://TU_IP_LOCAL:4200`
   - Ejemplo: `http://192.168.1.100:4200`

## 🐳 Despliegue con Docker (Opcional)

Si prefieres usar Docker:

1. **Crear Dockerfile**
   ```dockerfile
   FROM nginx:alpine
   COPY . /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Construir y ejecutar**
   ```bash
   docker build -t angular-jwt-app .
   docker run -p 4200:80 angular-jwt-app
   ```

## ⚠️ Solución de Problemas

### Problema: Puerto Ocupado
```
Error: listen EADDRINUSE: address already in use :::4200
```

**Solución:**
```bash
# Usar otro puerto
http-server -p 8080 -c-1

# O encontrar y cerrar el proceso que usa el puerto
# Windows
netstat -ano | findstr :4200
taskkill /PID <PID> /F

# Linux/macOS
lsof -ti:4200 | xargs kill
```

### Problema: Errores de CORS
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solución:**
- Verificar que el backend permita conexiones desde el puerto del frontend
- Configurar CORS en el servidor backend
- Usar proxy si es necesario

### Problema: Rutas no funcionan (404)
```
Cannot GET /home
```

**Solución:**
- Usar `serve` en lugar de `python -m http.server`
- O configurar el servidor para servir `index.html` para todas las rutas

```bash
# Con serve (maneja SPAs automáticamente)
serve -s . -l 4200
```

### Problema: Aplicación no carga
1. **Verificar que todos los archivos estén presentes**
2. **Comprobar la consola del navegador** (F12)
3. **Verificar que el servidor esté corriendo** en el puerto correcto

## 📱 Credenciales de Prueba

Para probar la aplicación, necesitarás credenciales válidas configuradas en tu backend. Ejemplos comunes:

```
Usuario: admin
Contraseña: admin

Usuario: test
Contraseña: test123
```

*(Verificar con el administrador del backend las credenciales correctas)*

## 🎯 Comandos Rápidos de Referencia

```bash
# Método más simple (Node.js)
npx http-server -p 4200 -c-1

# Método sin instalaciones (Python)
python3 -m http.server 4200

# Método moderno (con npm)
npx serve -s . -l 4200
```

## 📞 Soporte

Si experimentas problemas:

1. **Verificar requisitos del sistema**
2. **Comprobar logs del servidor** en la terminal
3. **Revisar consola del navegador** (F12 → Console)
4. **Verificar conectividad con el backend**
5. **Contactar al equipo de desarrollo**

---

**¡Listo!** Tu aplicación Angular JWT debería estar funcionando correctamente. Abre tu navegador en `http://localhost:4200` y comienza a usar la aplicación.