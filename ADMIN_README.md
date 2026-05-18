# Panel de Administración - GF MultiMarcas

## Acceso al Panel Admin

### En Desarrollo (localhost)
1. Ve al sitio web: `http://localhost:3000`
2. En el footer, busca "Panel Admin" en "Enlaces Rápidos"
3. Serás redirigido a la página de login: `http://localhost:3000/admin/login`
4. Ingresa la contraseña: `gfadmin2024`
5. Accede al panel completo en `http://localhost:3000/admin`

### En Producción (sitio publicado)
Cuando publiques el sitio, el acceso será similar pero necesitarás:

1. **URL del sitio publicado** (ejemplo: `https://gfmultimarcas.com`)
2. **Acceder al login**: `https://gfmultimarcas.com/admin/login`
3. **Contraseña**: `gfadmin2024` (o la que configures)

## Seguridad

### Autenticación
- **Sesión**: 24 horas de duración
- **Almacenamiento**: localStorage del navegador
- **Protección**: Solo usuarios con contraseña pueden acceder

### Cambiar la Contraseña
Para cambiar la contraseña de admin, modifica el archivo `app/admin/login/page.tsx`:

```typescript
// Cambia esta línea:
const ADMIN_PASSWORD = 'gfadmin2024'
// Por tu nueva contraseña:
const ADMIN_PASSWORD = 'tu_nueva_contraseña_segura'
```

### Mejores Prácticas para Producción
1. **Usa variables de entorno** para la contraseña:
   ```env
   ADMIN_PASSWORD=tu_contraseña_segura
   ```

2. **Implementa autenticación más robusta**:
   - JWT tokens
   - Base de datos de usuarios
   - Autenticación de dos factores

3. **Monitorea accesos** al panel admin

## Funcionalidades del Panel

### Gestión de Vehículos
- ✅ Agregar nuevos vehículos
- ✅ Editar vehículos existentes
- ✅ Eliminar vehículos
- ✅ Cambios reflejados inmediatamente en el sitio

### Campos de Vehículos
- Nombre, Marca, Modelo
- Año, Precio
- Tipo (Auto/Moto/Camioneta)
- Condición (0km/Usado)
- Kilometraje, Combustible, Transmisión
- URL de imagen
- Destacado (sí/no)

## Alternativas de Gestión

### Opción 1: Prisma Studio (Recomendado para desarrollo)
```bash
npm run prisma:studio
# O directamente:
npx prisma studio
```
Accede en: `http://localhost:5555`

### Opción 2: Base de datos directa
Edita directamente en `prisma/dev.db` usando herramientas SQLite

### Opción 3: API REST
Usa endpoints de la API para gestión programática

## Solución de Problemas

### No puedo acceder al panel
1. Verifica que el servidor esté corriendo
2. Limpia el localStorage del navegador
3. Verifica la contraseña en el código

### Cambios no se reflejan
1. Verifica que la base de datos esté conectada
2. Reinicia el servidor de desarrollo
3. Revisa la consola del navegador por errores

### Error de autenticación
1. La sesión expira en 24 horas
2. Borra localStorage y vuelve a loguear
3. Verifica que no haya cambios en el código de autenticación

## Próximos Pasos Recomendados

1. **Mejorar seguridad**: Implementar JWT o NextAuth.js
2. **Logs de auditoría**: Registrar accesos al admin
3. **Backup automático**: De la base de datos
4. **Múltiples administradores**: Sistema de usuarios
5. **Permisos granulares**: Diferentes niveles de acceso