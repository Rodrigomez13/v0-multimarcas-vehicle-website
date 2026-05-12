# 🗄️ Configuración de Base de Datos con Prisma

## ✅ Lo que se implementó

### 1. **Prisma ORM** 
   - ✔️ Configuración completamente funcional
   - ✔️ Schema con modelo `Vehicle`
   - ✔️ Migraciones automáticas
   - ✔️ Dependencias correctamente instaladas (incluyendo `ts-node`)

### 2. **API actualizada**
   - Endpoints: GET, POST, PUT, DELETE
   - Integración con base de datos real (SQLite)
   - Validaciones incorporadas

### 3. **Panel Admin mejorado** (`/admin`)
   - ✏️ **Editar vehículos**: Click en "Editar" → Modal con formulario completo
   - ➕ **Agregar**: Botón "Nuevo Vehículo"
   - 🗑️ **Eliminar**: Con confirmación
   - 📊 **Listado**: Vista tabla con todos los datos

### 4. **Hook actualizado**
   - Ahora soporta `updateVehicle()` además de agregar y eliminar

### 5. **Correcciones implementadas** ✨
   - ✔️ Agregado `ts-node` a devDependencies para ejecutar seed
   - ✔️ Configurada ruta correcta de BD: `./prisma/dev.db`
   - ✔️ Mejorados scripts en package.json
   - ✔️ BD SQLite inicializada y poblada con datos

---

## 🚀 Inicio Rápido

### **Para desarrollo (SQLite - Recomendado)**

```bash
# 1️⃣ Instalación inicial de dependencias
pnpm install

# 2️⃣ Inicializar BD por primera vez
pnpm db:init

# 3️⃣ Iniciar servidor de desarrollo
pnpm dev
```

✅ **Ahora puedes:**
- Acceder al catálogo en `http://localhost:3000`
- Usar el panel admin en `http://localhost:3000/admin`
- Abrir Prisma Studio: `pnpm prisma:studio`

---

## 📋 Comandos útiles

```bash
# Ver/editar datos en interfaz gráfica (Prisma Studio)
pnpm prisma:studio

# Crear nueva migración después de cambios en schema
pnpm prisma:migrate --name descripcion_cambio

# Resetear BD completamente (borra todo y reinicializa)
pnpm db:reset

# Generar cliente Prisma
pnpm prisma:generate

# Poblar BD con datos iniciales nuevamente
pnpm prisma:seed

# Setup completo sin migraciones
pnpm db:setup
```

---

## 🔄 Workflow típico

1. **Agregar vehículo**: Panel Admin → "Nuevo Vehículo" → Llenar formulario → Guardar
2. **Editar vehículo**: Panel Admin → Click "Editar" → Modificar datos → Guardar
3. **Eliminar vehículo**: Panel Admin → Click "Eliminar" → Confirmar
4. **Ver catálogo**: Ir a `/` (la página principal obtiene datos de BD)
5. **Inspeccionar datos**: `pnpm prisma:studio` para ver/editar en GUI

---

## 🗂️ Estructura de archivos

```
prisma/
├── schema.prisma       # Schema de BD (modelo Vehicle)
├── seed.ts            # Datos iniciales
├── dev.db             # ⭐ Base de datos SQLite (generada)
└── migrations/        # Historial de cambios en BD

.env.local            # Variables de entorno (DATABASE_URL)
package.json          # Scripts y dependencias ✅
```

---

## 🐛 Troubleshooting

### ❌ Error: "DATABASE_URL is not set"
**Solución:** Verifica que `.env.local` existe en la raíz del proyecto con:
```env
DATABASE_URL="file:./prisma/dev.db"
```

### ❌ Error: "Cannot connect to database"
**Solución:** Ejecuta:
```bash
pnpm db:reset
```

### ❌ El catálogo está vacío
**Solución:** Ejecuta:
```bash
pnpm prisma:seed
```

### ❌ Prisma Studio no abre
**Solución:** Asegúrate que `ts-node` está instalado:
```bash
pnpm install
```

### ❌ Error en migraciones después de cambiar schema
**Solución:** 
1. Edita `prisma/schema.prisma`
2. Ejecuta:
```bash
pnpm prisma:migrate --name nombre_cambio
```

### ❌ Necesito limpiar todo y empezar de nuevo
**Solución:**
```bash
pnpm db:reset  # Esto borra todo y repuebla la BD
```

---

## 🚀 Para producción (PostgreSQL)

### Alternativa a SQLite

1. **Crear base de datos PostgreSQL**
   - En [Neon](https://neon.tech) (gratis): Crear proyecto, copiar connection string
   - O localmente con Docker:
   ```bash
   docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
   ```

2. **Actualizar `prisma/schema.prisma`**
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. **Actualizar `.env.local`**
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/multimarcas"
   ```

4. **Migrar a PostgreSQL**
   ```bash
   pnpm prisma:migrate --name init
   pnpm prisma:seed
   ```

---

## 📚 Documentación oficial

- [Prisma Docs](https://www.prisma.io/docs/)
- [Next.js + Prisma](https://www.prisma.io/docs/getting-started/quickstart-guide)
- [SQLite](https://www.sqlite.org/)
- [PostgreSQL](https://www.postgresql.org/)
