# Kordia Frontend

Aplicación web moderna de música construida con React, TypeScript y Tailwind CSS.

## Características

- Búsqueda de música en YouTube
- Reproducción de audio en streaming
- Descarga de canciones para uso offline
- Biblioteca personal de canciones descargadas
- Interfaz moderna y responsiva
- Reproductor de audio con controles completos
- Cola de reproducción
- Diseño oscuro optimizado

## Requisitos Previos

- Node.js 16+
- Backend de Kordia corriendo en `http://localhost:8000`

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env
```

Edita `.env` y configura la URL del backend si es diferente:
```
VITE_API_URL=http://localhost:8000
```

## Desarrollo

Iniciar el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Construcción

Para construir la aplicación para producción:
```bash
npm run build
```

Los archivos compilados estarán en el directorio `dist/`

## Estructura del Proyecto

```
src/
├── components/        # Componentes reutilizables
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── Player.tsx
│   ├── MobileNav.tsx
│   ├── Queue.tsx
│   └── SongCard.tsx
├── contexts/         # Contextos de React
│   └── PlayerContext.tsx
├── services/         # Servicios de API
│   └── api.ts
├── types/            # Tipos TypeScript
│   └── index.ts
├── utils/            # Utilidades
│   └── formatTime.ts
├── views/            # Vistas principales
│   ├── Home.tsx
│   ├── Search.tsx
│   ├── Library.tsx
│   └── Settings.tsx
├── App.tsx           # Componente principal
└── main.tsx          # Punto de entrada
```

## Características Técnicas

### Tecnologías

- **React 18** - Framework UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Vite** - Build tool rápido
- **Lucide React** - Iconos modernos

### Gestión de Estado

- **Context API** - Estado global del reproductor
- **React Hooks** - Gestión de estado local

### Características del Reproductor

- Reproducción continua
- Cola de reproducción
- Controles de volumen
- Barra de progreso interactiva
- Navegación entre canciones
- Soporte para canciones offline

## API del Backend

El frontend se conecta a estos endpoints del backend:

- `GET /search?q={query}` - Buscar canciones
- `GET /stream/{ytid}` - Obtener URL de streaming
- `POST /offline/download/{ytid}` - Descargar canción
- `GET /offline` - Listar canciones offline
- `GET /offline/audio/{ytid}` - Servir audio offline
- `DELETE /offline/{ytid}` - Eliminar canción offline
- `POST /cleanup` - Limpiar caché

## Uso

1. **Búsqueda**: Navega a la sección "Buscar" e ingresa el nombre de una canción
2. **Reproducción**: Haz clic en cualquier canción para reproducirla
3. **Descarga**: Haz clic en el ícono de descarga para guardar offline
4. **Biblioteca**: Accede a tus canciones descargadas en "Biblioteca"
5. **Cola**: Visualiza y gestiona la cola de reproducción
6. **Ajustes**: Limpia el caché y consulta información de la app

## Responsividad

La aplicación está optimizada para:
- Móviles (< 768px) - Navegación inferior
- Tablets (768px - 1024px) - Sidebar lateral
- Desktop (> 1024px) - Interfaz completa

## Licencia

MIT
