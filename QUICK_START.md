# 🚀 Guía Rápida: Editor Visual + Base de Datos Real

## 📦 Lo que está listo

✅ **Panel Admin con Editor Visual**
- URL: `http://localhost:3000/admin`
- Agregar, editar y eliminar vehículos
- Formulario completo con validación

✅ **API integrada con Prisma**
- POST (crear), GET (obtener), PUT (actualizar), DELETE (eliminar)
- Almacenamiento en base de datos real

✅ **Catálogo dinámico**
- Los cambios en admin se reflejan inmediatamente

---

## ⚡ Inicio rápido (SQLite para desarrollo)

### 1. **Instalar dependencias** (si no las instaló)
```bash
npm install @prisma/client prisma ts-node
```

### 2. **Configurar BD (SQLite)**

**Editar `.env.local`:**
```env
DATABASE_URL="file:./prisma/dev.db"
```

### 3. **Crear BD e inicializar con datos**
```bash
npm run db:init
```

Esto:
- Crea el archivo `prisma/dev.db`
- Ejecuta migraciones
- Llena con 12 vehículos de ejemplo

### 4. **Iniciar desarrollo**
```bash
npm run dev
```

---

## 🎨 Usar el panel admin

### **Agregar vehículo**
1. Ir a `http://localhost:3000/admin`
2. Click en botón **"Nuevo Vehículo"**
3. Llenar formulario
4. Click **"Agregar Vehículo"**

### **Editar vehículo**
1. En la tabla, buscar el vehículo
2. Click en botón **"Editar"**
3. Modificar datos en el modal
4. Click **"Guardar Cambios"**

### **Eliminar vehículo**
1. En la tabla, buscar el vehículo
2. Click en **"Eliminar"**
3. Confirmar en el diálogo

---

## 🐘 Para producción: PostgreSQL

### 1. **Crear BD en Neon**
- Ir a: https://neon.tech
- Crear proyecto gratis
- Copiar cadena de conexión

### 2. **Actualizar `.env.local`**
```env
DATABASE_URL="postgresql://user:password@ep-xxx.neon.tech/database?sslmode=require"
```

### 3. **Ejecutar**
```bash
npm run prisma:migrate
npm run prisma:seed
```

---

## 🛠️ Comandos útiles

```bash
# Ver BD en interfaz visual
npm run prisma:studio

# Resetear BD completamente
npm run prisma:reset

# Solo hacer migración
npm run prisma:migrate

# Solo llenar datos
npm run prisma:seed
```

---

## 📝 Notas

- Los datos se guardan en BD real (no desaparecen al reiniciar)
- El formulario valida que nombre, marca y modelo sean obligatorios
- Las imágenes usan URLs (no subida de archivos)
- El catálogo se actualiza automáticamente

---

## 🔗 Ver resultados

- **Catálogo**: `http://localhost:3000/` (muestra datos de BD)
- **Admin**: `http://localhost:3000/admin` (gestiona datos)
- **BD Studio**: `npm run prisma:studio` (editor gráfico de datos)

