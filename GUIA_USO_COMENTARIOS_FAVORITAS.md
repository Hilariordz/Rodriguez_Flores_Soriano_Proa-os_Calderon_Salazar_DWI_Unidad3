# 📖 Guía de Uso - Comentarios y Favoritas

## 🎯 Cómo Visualizar y Usar las Funcionalidades

### 1. 🌐 Acceder a la Aplicación

1. **Inicia los servidores:**
   ```bash
   # Terminal 1: Backend
   php artisan serve
   
   # Terminal 2: Frontend
   npm run dev
   ```

2. **Abre tu navegador:**
   - Ve a: http://127.0.0.1:8000
   - Inicia sesión o regístrate

---

### 2. ⭐ Mis Favoritas

#### Ver tus favoritas:
1. En el menú superior, haz clic en **"Mis Favoritas"**
2. Verás todas las recetas que has guardado
3. Cada tarjeta muestra:
   - Imagen de la receta
   - Nombre
   - Tiempo de preparación
   - Descripción
   - Precio (si aplica)

#### Agregar a favoritas:
1. Ve a **"Recetas"** en el menú
2. Haz clic en cualquier receta
3. En la página de detalle, haz clic en **"Agregar a Favoritas"**

#### Eliminar de favoritas:
1. En **"Mis Favoritas"**
2. Haz clic en el botón **"✕"** en la receta que quieras eliminar
3. Confirma la eliminación

---

### 3. 💬 Comentarios

#### Ver comentarios de una receta:
1. Ve a **"Recetas"**
2. Haz clic en cualquier receta
3. Desplázate hacia abajo para ver la sección de **"Comentarios"**
4. Verás:
   - Nombre del usuario que comentó
   - Fecha del comentario
   - Texto del comentario

#### Agregar un comentario:
1. En la página de detalle de una receta
2. Escribe tu comentario en el cuadro de texto
3. Haz clic en **"Agregar Comentario"**
4. Tu comentario aparecerá inmediatamente

#### Ver tus comentarios:
1. En el menú superior, haz clic en **"Mis Comentarios"**
2. Verás todos los comentarios que has hecho
3. Cada comentario muestra:
   - ID de la receta
   - Fecha y hora
   - Tu comentario

#### Editar un comentario:
1. En **"Mis Comentarios"**
2. Haz clic en **"Editar"**
3. Modifica el texto
4. Haz clic en **"Guardar"**

#### Eliminar un comentario:
1. En **"Mis Comentarios"**
2. Haz clic en **"Eliminar"**
3. Confirma la eliminación

---

### 4. ⭐ Valoraciones

#### Ver valoración de una receta:
1. Ve a la página de detalle de cualquier receta
2. En la sección **"Valoración"** verás:
   - Promedio de estrellas (ej: 4.5 ★)
   - Número total de valoraciones

#### Valorar una receta:
1. En la página de detalle de una receta
2. En la sección **"Tu valoración"**
3. Haz clic en las estrellas (1-5)
4. Tu valoración se guarda automáticamente
5. El promedio se actualiza en tiempo real

#### Cambiar tu valoración:
1. Simplemente haz clic en un número diferente de estrellas
2. Se actualizará automáticamente

---

## 🗺️ Navegación del Sitio

### Menú Principal (cuando estás autenticado):
- **Dashboard:** Buscador de recetas
- **Recetas:** Explorar recetas por categoría
- **Mis Favoritas:** Ver tus recetas guardadas
- **Mis Comentarios:** Ver y editar tus comentarios
- **Profile:** Editar tu perfil
- **Log Out:** Cerrar sesión

---

## 📱 Páginas Disponibles

### 1. Dashboard (http://127.0.0.1:8000/dashboard)
- Buscador de recetas
- Escribe términos como "tacos", "pasta", "chicken"
- Muestra resultados con imágenes

### 2. Recetas (http://127.0.0.1:8000/recetas)
- Explora por categorías:
  - Todas
  - Desayuno
  - Almuerzo
  - Cena
  - Postres
  - Entradas
  - Snacks

### 3. Detalle de Receta (http://127.0.0.1:8000/receta/{id})
- Imagen grande de la receta
- Información completa
- Botón para agregar a favoritas
- Sección de valoración (estrellas)
- Sección de comentarios
- Formulario para agregar comentario

### 4. Mis Favoritas (http://127.0.0.1:8000/mis-favoritas)
- Grid de todas tus recetas favoritas
- Botón para ver detalle
- Botón para eliminar

### 5. Mis Comentarios (http://127.0.0.1:8000/mis-comentarios)
- Lista de todos tus comentarios
- Botones para editar
- Botones para eliminar

---

## 🎨 Características Visuales

### Diseño:
- ✅ Fondo oscuro elegante (gris/negro)
- ✅ Acentos dorados (amarillo)
- ✅ Animaciones suaves
- ✅ Efectos hover
- ✅ Responsive (móvil y desktop)

### Interacciones:
- ✅ Carga dinámica de datos
- ✅ Actualización en tiempo real
- ✅ Confirmaciones antes de eliminar
- ✅ Mensajes de error/éxito
- ✅ Loading states

---

## 🔧 Funcionalidades Técnicas

### Favoritas:
- ✅ Agregar receta a favoritas
- ✅ Ver lista de favoritas
- ✅ Eliminar de favoritas
- ✅ Prevención de duplicados
- ✅ Solo tus favoritas son visibles

### Comentarios:
- ✅ Ver comentarios de cualquier receta (público)
- ✅ Agregar comentario (autenticado)
- ✅ Editar tus comentarios
- ✅ Eliminar tus comentarios
- ✅ Paginación (10 por página)
- ✅ Muestra nombre del autor

### Valoraciones:
- ✅ Ver promedio de valoraciones (público)
- ✅ Ver distribución de estrellas (público)
- ✅ Valorar receta 1-5 estrellas (autenticado)
- ✅ Actualizar tu valoración
- ✅ Un usuario = una valoración por receta
- ✅ Cálculo automático de promedios

---

## 🧪 Prueba las Funcionalidades

### Flujo Completo:

1. **Registrarse/Iniciar Sesión**
   - Ve a http://127.0.0.1:8000
   - Regístrate con email y contraseña

2. **Explorar Recetas**
   - Haz clic en "Recetas" en el menú
   - Selecciona una categoría (ej: Postres)

3. **Ver Detalle**
   - Haz clic en cualquier receta
   - Verás la página completa con imagen, info, comentarios

4. **Agregar a Favoritas**
   - Haz clic en "Agregar a Favoritas"
   - El botón cambiará a "★ Favorita"

5. **Valorar**
   - Haz clic en las estrellas (ej: 5 estrellas)
   - Verás tu valoración guardada

6. **Comentar**
   - Escribe un comentario
   - Haz clic en "Agregar Comentario"
   - Tu comentario aparecerá en la lista

7. **Ver Mis Favoritas**
   - Haz clic en "Mis Favoritas" en el menú
   - Verás la receta que guardaste

8. **Ver Mis Comentarios**
   - Haz clic en "Mis Comentarios" en el menú
   - Verás tu comentario
   - Prueba editarlo o eliminarlo

---

## 📊 APIs Utilizadas

### Frontend → Backend:

```javascript
// Favoritas
GET    /api/favoritas              // Listar mis favoritas
POST   /api/favoritas              // Agregar a favoritas
DELETE /api/favoritas/{id}         // Eliminar favorita
GET    /api/favoritas/check/{id}   // Verificar si es favorita

// Comentarios
GET    /api/comentarios/{recetaId}      // Ver comentarios (público)
POST   /api/comentarios                 // Agregar comentario
PUT    /api/comentarios/{id}            // Editar comentario
DELETE /api/comentarios/{id}            // Eliminar comentario
GET    /api/comentarios/mis-comentarios // Mis comentarios

// Valoraciones
GET    /api/valoraciones/{recetaId}/promedio      // Ver promedio (público)
GET    /api/valoraciones/{recetaId}/mi-valoracion // Mi valoración
POST   /api/valoraciones                          // Valorar receta
DELETE /api/valoraciones/{recetaId}               // Eliminar valoración

// Recetas
GET    /api/recetas/buscar?query={term}    // Buscar
GET    /api/recetas/detalle/{id}           // Detalle
GET    /api/recetas/aleatorias             // Aleatorias
GET    /api/recetas/categoria/{tipo}       // Por categoría
```

---

## ⚠️ Notas Importantes

1. **Debes estar autenticado** para:
   - Agregar a favoritas
   - Comentar
   - Valorar
   - Ver tus favoritas
   - Ver tus comentarios

2. **Puedes ver sin autenticación:**
   - Comentarios de recetas
   - Valoraciones promedio
   - Distribución de estrellas

3. **Solo puedes editar/eliminar:**
   - Tus propios comentarios
   - Tus propias favoritas
   - Tus propias valoraciones

---

## 🎯 Resumen de URLs

| Página | URL | Descripción |
|--------|-----|-------------|
| Home | http://127.0.0.1:8000 | Página principal |
| Dashboard | http://127.0.0.1:8000/dashboard | Buscador |
| Recetas | http://127.0.0.1:8000/recetas | Explorar |
| Detalle | http://127.0.0.1:8000/receta/{id} | Ver receta completa |
| Mis Favoritas | http://127.0.0.1:8000/mis-favoritas | Tus favoritas |
| Mis Comentarios | http://127.0.0.1:8000/mis-comentarios | Tus comentarios |

---

**¡Disfruta explorando y comentando recetas! 🍽️✨**
