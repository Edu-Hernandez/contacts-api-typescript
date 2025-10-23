# 📚 **CRUD API con TypeScript y Express**

## **🎯 ¿Qué construimos?**

Un **API REST completa** para gestión de contactos con:

- ✅ **TypeScript** para tipado estático
- ✅ **Express.js** como framework web
- ✅ **Joi** para validación de datos
- ✅ **Nodemon** para desarrollo automático
- ✅ **CRUD completo** (Create, Read, Update, Delete)

---

## **🏗️ Arquitectura del Proyecto**

```
src/
├── controllers/     # Lógica de negocio
├── routes/         # Definición de rutas
├── middleware/      # Funciones intermedias
├── validation/      # Esquemas de validación
├── types/          # Definiciones TypeScript
├── data/           # Datos de ejemplo
└── index.ts        # Punto de entrada
```

---

## **🔧 Tecnologías Utilizadas**

### **1. TypeScript**

**¿Qué es?** Superset de JavaScript que añade tipado estático.

**¿Para qué lo usamos?**

- **Tipado seguro**: Detecta errores en tiempo de compilación
- **Mejor IntelliSense**: Autocompletado y documentación
- **Refactoring seguro**: Cambios de código sin romper funcionalidad

**Configuración en `tsconfig.json`:**

```json
{
  "compilerOptions": {
    "target": "ES2020", // Versión de JavaScript objetivo
    "module": "CommonJS", // Sistema de módulos
    "strict": true, // Verificaciones estrictas
    "esModuleInterop": true // Compatibilidad con ES modules
  },
  "ts-node": {
    "transpileOnly": true, // Compilación rápida
    "compilerOptions": {
      "module": "CommonJS"
    }
  }
}
```

### **2. Express.js**

**¿Qué es?** Framework minimalista para aplicaciones web en Node.js.

**¿Para qué lo usamos?**

- **Servidor HTTP**: Manejo de peticiones y respuestas
- **Routing**: Definición de endpoints
- **Middleware**: Funciones intermedias (validación, autenticación, etc.)

**Configuración básica:**

```typescript
import express from "express";

const app = express();
app.use(express.json()); // Parsear JSON automáticamente
```

### **3. Joi - Validación de Datos**

**¿Qué es?** Librería para validación de esquemas de datos.

**¿Para qué lo usamos?**

- **Validar entrada**: Verificar que los datos del cliente sean correctos
- **Prevenir errores**: Evitar datos malformados en la base de datos
- **Documentación**: Los esquemas sirven como documentación de la API

**Ejemplo de uso:**

```typescript
import Joi from "joi";

export const contactSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9+\-\s()]+$/)
    .required(),
  address: Joi.string().min(5).max(100).required(),
});
```

**¿Cuándo usar Joi?**

- ✅ **Validar datos de entrada** (POST, PUT)
- ✅ **Validar parámetros de URL**
- ✅ **Validar headers HTTP**
- ❌ **NO usar para validar datos de base de datos** (usa ORM/ODM)

### **4. Nodemon**

**¿Qué es?** Herramienta que reinicia automáticamente el servidor cuando detecta cambios.

**Configuración en `package.json`:**

```json
{
  "scripts": {
    "dev": "nodemon --exec npx ts-node src/index.ts"
  }
}
```

---

## **📋 Estructura de Archivos Explicada**

### **1. `src/types/contact.ts` - Definición de Tipos**

```typescript
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**¿Por qué es importante?**

- **Consistencia**: Todos los archivos usan el mismo tipo
- **IntelliSense**: Autocompletado en el IDE
- **Detección de errores**: TypeScript avisa si usas campos incorrectos

### **2. `src/validation/contactValidation.ts` - Esquemas de Validación**

```typescript
export const contactSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  // ... más validaciones
});
```

**¿Cuándo usar cada esquema?**

- **`contactSchema`**: Para crear contactos (POST)
- **`updateContactSchema`**: Para actualizar contactos (PUT/PATCH)

### **3. `src/middleware/validation.ts` - Middleware de Validación**

```typescript
export const validate = (schema: Joi.ObjectSchema): RequestHandler => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: "Datos de validación incorrectos",
        details: error.details[0].message,
      });
    }
    next();
  };
};
```

**¿Cómo funciona?**

1. Recibe un esquema de Joi
2. Valida `req.body` contra el esquema
3. Si hay errores, devuelve 400 con detalles
4. Si está bien, continúa con `next()`

### **4. `src/controllers/contactController.ts` - Lógica de Negocio**

```typescript
export const createContact = (req: Request, res: Response) => {
  try {
    const newContact: Contact = {
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      // ... más campos
    };
    datos.push(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el contacto" });
  }
};
```

**Patrón de controladores:**

- **Try-catch**: Manejo de errores
- **Tipado**: Uso de interfaces TypeScript
- **Status codes**: Respuestas HTTP correctas
- **JSON responses**: Datos estructurados

### **5. `src/routes/contactRoutes.ts` - Definición de Rutas**

```typescript
router.post("/", validate(contactSchema), createContact);
router.put("/:id", validate(updateContactSchema), updateContact);
```

**¿Cómo funciona el middleware?**

- **`validate(contactSchema)`**: Se ejecuta ANTES que `createContact`
- **Si falla**: Devuelve error 400 y NO ejecuta el controlador
- **Si pasa**: Ejecuta el controlador con datos validados

---

## **🚀 Endpoints de la API**

| Método   | Endpoint        | Descripción                  | Validación               |
| -------- | --------------- | ---------------------------- | ------------------------ |
| `GET`    | `/contacts`     | Obtener todos los contactos  | ❌                       |
| `GET`    | `/contacts/:id` | Obtener contacto por ID      | ❌                       |
| `POST`   | `/contacts`     | Crear nuevo contacto         | ✅ `contactSchema`       |
| `PUT`    | `/contacts/:id` | Actualizar contacto completo | ✅ `updateContactSchema` |
| `DELETE` | `/contacts/:id` | Eliminar contacto            | ❌                       |

---

## **⚠️ Conflictos y Problemas Comunes**

### **1. Dependencias Deprecadas**

**Problema:** `@types/joi` está deprecado
**Solución:** Joi v17+ incluye tipos nativos, no necesitas `@types/joi`

### **2. Conflictos de Módulos**

**Problema:** ES modules vs CommonJS
**Solución:** Usar configuración consistente en `tsconfig.json`

### **3. Puerto en Uso**

**Problema:** `EADDRINUSE: address already in use`
**Solución:**

```bash
# Encontrar proceso
netstat -ano | findstr :3000
# Matar proceso
taskkill /PID [PID] /F
```

### **4. Imports de TypeScript**

**Problema:** Errores de resolución de módulos
**Solución:**

- **CommonJS**: Sin extensiones en imports
- **ES modules**: Usar `.js` en imports (TypeScript resuelve automáticamente)

---

## **🔧 Configuración de Desarrollo**

### **Scripts en `package.json`:**

```json
{
  "scripts": {
    "dev": "nodemon --exec npx ts-node src/index.ts", // Desarrollo
    "build": "tsc", // Compilar
    "start": "node dist/index.js" // Producción
  }
}
```

### **Dependencias Necesarias:**

```json
{
  "dependencies": {
    "express": "^4.18.2", // Framework web
    "joi": "^17.11.0" // Validación
  },
  "devDependencies": {
    "@types/express": "^4.17.21", // Tipos para Express
    "@types/node": "^20.10.5", // Tipos para Node.js
    "nodemon": "^3.0.2", // Auto-restart
    "ts-node": "^10.9.2", // Ejecutar TypeScript
    "typescript": "^5.3.3" // Compilador TypeScript
  }
}
```

---

## **🎯 Mejores Prácticas**

### **✅ SÍ Hacer:**

- **Usar TypeScript** para proyectos medianos/grandes
- **Validar datos de entrada** con Joi
- **Separar responsabilidades** (controllers, routes, middleware)
- **Manejar errores** con try-catch
- **Usar status codes** HTTP correctos
- **Documentar la API** con comentarios

### **❌ NO Hacer:**

- **Mezclar ES modules y CommonJS** sin configuración
- **Usar dependencias deprecadas** como `@types/joi`
- **Validar en el controlador** (usa middleware)
- **Ignorar errores** de TypeScript
- **Hardcodear puertos** (usa variables de entorno)

---

## **🚀 Cómo Ejecutar el Proyecto**

```bash
# Instalar dependencias
npm install

# Desarrollo (con auto-restart)
npm run dev

# Compilar para producción
npm run build

# Ejecutar en producción
npm start
```

**¡Tu API estará disponible en `http://localhost:3001`!**

---

## **📝 Ejemplos de Uso**

### **Crear un contacto:**

```bash
POST http://localhost:3001/contacts
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@email.com",
  "phone": "123456789",
  "address": "Calle 123, Ciudad"
}
```

### **Obtener todos los contactos:**

```bash
GET http://localhost:3001/contacts
```

### **Actualizar un contacto:**

```bash
PUT http://localhost:3001/contacts/1
Content-Type: application/json

{
  "name": "Juan Carlos Pérez"
}
```

### **Eliminar un contacto:**

```bash
DELETE http://localhost:3001/contacts/1
```

---

## **🔍 Troubleshooting**

### **Error: "Cannot find module"**

- Verificar que los imports no tengan extensiones `.ts`
- Revisar la configuración de `tsconfig.json`

### **Error: "Port already in use"**

- Cambiar el puerto en `src/index.ts`
- O matar el proceso que usa el puerto

### **Error: "Validation failed"**

- Revisar que los datos cumplan con el esquema de Joi
- Verificar que el Content-Type sea `application/json`

---

## **📚 Recursos Adicionales**

- [Documentación de TypeScript](https://www.typescriptlang.org/docs/)
- [Documentación de Express](https://expressjs.com/)
- [Documentación de Joi](https://joi.dev/api/)
- [Guía de Node.js](https://nodejs.org/docs/)
