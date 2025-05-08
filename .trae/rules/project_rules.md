# 📐 ColabOS - Reglas del Proyecto Frontend

Este archivo define las reglas, convenciones y buenas prácticas que debe seguir **cualquier funcionalidad nueva, corrección de errores, o modificación** del código del proyecto frontend de **ColabOS**.

Está pensado para ser usado por desarrolladores humanos **y por herramientas de generación de código asistidas por IA**.

---

## 📦 Arquitectura Base

- El frontend está construido con **React + TypeScript**, usando **Vite**.
- El sistema de autenticación se basa en **Clerk**.
- El enrutamiento se realiza con **React Router v6+**.
- Se utiliza **Zustand** para manejo de estado local/global ligero.
- Estilos con **TailwindCSS**.
- Se consume una **API externa (Laravel)** mediante **Axios**.

---

## 🧠 Principios Fundamentales

1. **Código limpio y legible.**
2. **Modularidad:** todo debe estar bien separado por responsabilidades.
3. **Escalabilidad:** el diseño del componente debe anticipar su posible crecimiento.
4. **Reutilización:** usa o extiende componentes existentes si ya hacen algo similar.
5. **Convención sobre configuración:** sigue la estructura ya definida.

---

## 📁 Estructura de carpetas
src/
├── contexts/
│ ├── <module>/ → Un dominio funcional (ej: notes, tasks, files)
│ │ ├── actions/ → Funciones que gestionan datos (ej: llamadas API)
│ │ ├── components/ → Componentes específicos del módulo
│ │ ├── hooks/ → Hooks específicos del módulo
│ │ ├── libs/ → Funciones de lógica interna o helpers
│ │ ├── pages/ → Páginas relacionadas con el módulo
│ │ ├── routes/ → Subrutas del módulo si aplica
│ │ └── utils/ → Utilidades del módulo
│ ├── shared/ → Elementos reutilizables globalmente
│ │ ├── components/ → Botones, modales, inputs, tarjetas, etc.
│ │ ├── hooks/ → Hooks globales
│ │ ├── pages/ → Páginas comunes (ej: NotFound, Error)
│ │ ├── libs/ → Helpers reutilizables
│ │ └── layouts/ → Layouts generales (AuthLayout, AppLayout)
├── i18n/
│ ├── locales/ → Archivos JSON para idiomas
│ │ ├── en.json
│ │ └── es.json
│ ├── index.ts → Configuración de i18n
│ └── languages.ts → Idiomas disponibles
├── routes/
│ └── index.tsx → Definición del enrutador principal

## 🧱 Reglas para generar nuevo código

### 🧩 Componentes

- Si necesitas un nuevo componente:
  - **Ubícalo en la carpeta adecuada.**
  - Usa funcionalidad declarativa (React Hooks).
  - Debe aceptar `props` claras y tipadas.
  - Si representa una acción o comportamiento repetido (ej. modal de confirmación), debe ir a `src/contexts/shared/components/ui/`.

### 📄 Páginas

- Cualquier nueva funcionalidad completa (como "Gestión de archivos") debe tener una página (`src/pages/NOMBRE.tsx`) y layout si aplica.
- Usa `useUser()` de Clerk si necesita datos del usuario logueado.

### 🔐 Autenticación

- Usa `<SignedIn>` y `<SignedOut>` para proteger rutas.
- Puedes usar `RedirectToSignIn()` o `withClerk`.

### 🌐 Servicios API

- Usa el cliente de `axios` que hay en `contexts/shared/libs/axiosHTTPClient.ts` y ubica funciones de cada modulo en `src/contexts/NOMBRE_MODULO/actions/NOMBRE.ts`.  
- Cualquier petición autenticada debe incluir el JWT de Clerk (`getToken()`).

### 🔄 Estado global

- Usa Zustand solo si el estado se comparte entre componentes. Crea stores en `src/contexts/NOMBRE_MODULO/store/`.
- Evita prop drilling innecesario.

---

## ✅ Reglas de implementación

- Usa `async/await` para peticiones.
- Tipar siempre los datos (`interface`, `type`).
- Comenta cuando el código no sea obvio.
- Sigue el patrón de diseño ya establecido (por ejemplo, no reinventar modales o layouts).
- Usa Tailwind para estilos; no usar CSS-in-JS.

---

## 📚 Documentación y buenas prácticas

- Cada nuevo componente debe tener una breve descripción como comentario.
- Si se trata de una funcionalidad compleja, acompáñala de un archivo `README.md` dentro de su subcarpeta.
- Todas las funciones deben estar correctamente nombradas y tipadas.

---

## 📦 Ejemplo de un feature nuevo solicitado a IA

> "Crear un widget para tomar notas rápidas colaborativas, visibles solo para el usuario autenticado. Mostrarlo en el Dashboard, permitir crear, editar y borrar."

🔁 La IA debe:
- Ver si hay ya un widget base de notas. Si no, crear uno nuevo en `contexts/notes/components/QuickNotes.tsx`.
- Conectar a API en `contexts/notes/actions/createNote.ts`.
- Usar Zustand si se necesita sincronización entre componentes.
- Tipar el contenido (`Note`, `NoteFormData`, etc.). En `contexts/notes/libs/types.ts`

---

Este archivo debe mantenerse actualizado durante el desarrollo del proyecto.