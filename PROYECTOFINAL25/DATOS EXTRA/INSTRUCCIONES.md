# 🚀 INSTRUCCIONES - PASO A PASO

## 📋 PASO 1: Levantar PostgreSQL en Docker

### Ejecuta este comando en PowerShell:

```powershell
cd "c:\Users\alfao\Desktop\6TO SEMESTRE\6TO SEMESTRE\SIS324\PROYECTO FINAL"
docker-compose up -d
```

### Verifica que el contenedor esté corriendo:

```powershell
docker ps
```

Deberías ver: `showtime_hub_db` en la lista

---

## 📋 PASO 2: Conectar DBeaver a la Base de Datos

### Datos de conexión:
- **Host**: localhost
- **Port**: 5432
- **Database**: showtime_hub
- **Username**: showtime_admin
- **Password**: showtime2025

---

## 📋 PASO 3: Ejecutar Scripts SQL

1. Abre DBeaver
2. Conecta a la base de datos
3. Abre el archivo `database/showtime_hub_complete.sql`
4. Ejecuta todo el archivo (Ctrl+A, luego Ctrl+Enter)
5. Abre el archivo `database/seed_data.sql`
6. Ejecuta todo el archivo

---

## ✅ Verificación

```sql
-- Ver todas las tablas
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' ORDER BY table_name;

-- Ver usuarios de prueba
SELECT email, tipo_usuario FROM usuarios;
```

---

**Dime cuando hayas completado el PASO 1** ✋
