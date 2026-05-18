# 🗄️ Configuración de Base de Datos con Prisma

## ✅ Lo que se implementó

### 1. **Prisma ORM**
   - Configuración lista para usar
   - Schema con modelo `Vehicle`
   - Migraciones automáticas

### 2. **API actualizada**
   - Endpoints: GET, POST, PUT, DELETE
   - Integración con base de datos real
   - Validaciones incorporadas

### 3. **Panel Admin mejorado** (`/admin`)
   - ✏️ **Editar vehículos**: Click en "Editar" → Modal con formulario completo
   - ➕ **Agregar**: Botón "Nuevo Vehículo"
   - 🗑️ **Eliminar**: Con confirmación
   - 📊 **Listado**: Vista tabla con todos los datos

### 4. **Hook actualizado**
   - Ahora soporta `updateVehicle()` además de agregar y eliminar

---

## 🚀 Pasos para activar

### **Opción A: PostgreSQL (Recomendado para producción)**

1. **Crear base de datos PostgreSQL**
   ```bash
   # En Neon (gratis): https://neon.tech
   # O localmente con Docker:
   docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
   ```

2. **Actualizar `.env.local`**
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/multimarcas?schema=public"
   ```

3. **Migrar y poblar BD**
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

---

### **Opción B: SQLite (Para desarrollo rápido)**

1. **Cambiar `.env.local`**
   ```env
   DATABASE_URL="file:./prisma/dev.db"
   ```

2. **Migrar y poblar**
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

---

## 📋 Comandos útiles

```bash
# Ver/editar datos en interfaz gráfica
npx prisma studio

# Crear nueva migración después de cambios en schema
npx prisma migrate dev --name descripcion_cambio

# Resetear BD completamente
npx prisma migrate reset

# Generar cliente Prisma
npx prisma generate
```

---

## 🔄 Workflow típico

1. **Agregar vehículo**: Panel Admin → "Nuevo Vehículo" → Llenar formulario → Guardar
2. **Editar vehículo**: Panel Admin → Click "Editar" → Modificar datos → Guardar
3. **Eliminar vehículo**: Panel Admin → Click "Eliminar" → Confirmar
4. **Ver catálogo**: Ir a `/` (la página principal obtiene datos de BD)

---

## 🐛 Troubleshooting

### Error: "DATABASE_URL is not set"
→ Verifica que `.env.local` existe y tiene `DATABASE_URL`

### Error: "Cannot connect to database"
→ Verifica que tu base de datos está corriendo y la URL es correcta

### El catálogo está vacío
→ Ejecuta: `npx prisma db seed`

### Cambios en schema
→ Edita `prisma/schema.prisma` → Ejecuta: `npx prisma migrate dev --name descripcion`

---

## 📚 Próximas mejoras opcionales

- [ ] Agregar autenticación al panel `/admin`
- [ ] Importar vehículos desde CSV/JSON
- [ ] Agregar imágenes (subida a servidor)
- [ ] Historial de cambios
- [ ] Filtros avanzados en admin

---

## 📖 Documentación oficial

- [Prisma Docs](https://www.prisma.io/docs/)
- [Next.js + Prisma](https://www.prisma.io/docs/getting-started/quickstart-guide)
