# Sistema de Gestión de Acreditación ACAAI

Este proyecto es un sistema de gestión para la Agencia Centroamericana de Acreditación de Programas de Arquitectura e Ingeniería (ACAAI), desarrollado con Angular 16.

## Requisitos Previos

- Node.js (versión mínima 22.11.0)
- Angular CLI (versión 19.0.2)
- NPM (incluido con Node.js)

## Instalación

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Navega al directorio del proyecto:
```bash
cd acaai
```

3. Instala las dependencias:
```bash
npm install
```

4. Inicia el servidor de desarrollo:
```bash
ng serve -o
```

La aplicación se abrirá automáticamente en `http://localhost:4200/`.

## Estructura del Proyecto

El proyecto sigue una arquitectura modular y está organizado siguiendo los principios SOLID y Atomic Design. La estructura de carpetas es la siguiente:

```
src/
├── app/
│   ├── features/          # Módulos funcionales de la aplicación
│   │   ├── auth/          # Autenticación
│   │   ├── dashboard/     # Dashboard principal
│   │   ├── documents/     # Gestión de documentos
│   │   ├── evaluations/   # Evaluaciones
│   │   ├── notifications/ # Notificaciones
│   │   ├── requests/      # Solicitudes
│   │   └── self-study/    # Autoestudio
│   ├── shared/           # Componentes, pipes y servicios compartidos
│   │   ├── components/   # Componentes reutilizables
│   │   ├── layout/       # Componentes de layout
│   │   ├── pipes/        # Pipes personalizados
│   │   └── services/     # Servicios compartidos
│   └── app.module.ts     # Módulo raíz
└── assets/              # Recursos estáticos
```

## Componentes Principales

### Layout Principal (MainLayoutComponent)
- Ubicación: `src/app/shared/layout/main-layout/`
- Propósito: Componente contenedor principal que maneja la estructura base de la aplicación.
- Características:
  - Header con logo y menú de usuario
  - Sidebar de navegación
  - Área de contenido dinámico
  - Modal de confirmación para logout

### Módulos Funcionales

1. **Auth Module**
   - Maneja la autenticación de usuarios
   - Componentes:
     - Login
     - Recuperación de contraseña

2. **Dashboard Module**
   - Página principal con resumen de actividades
   - Widgets informativos
   - Estadísticas y gráficos

3. **Documents Module**
   - Gestión de documentos
   - Upload y preview de archivos
   - Organización por categorías

4. **Notifications Module**
   - Sistema de notificaciones en tiempo real
   - Filtros y búsqueda
   - Agrupación por fechas

5. **Requests Module**
   - Gestión de solicitudes de acreditación
   - Formularios dinámicos
   - Seguimiento de estado

6. **Self-Study Module**
   - Formularios de autoestudio
   - Guardado automático
   - Validaciones dinámicas

## Routing

El sistema de rutas está organizado jerárquicamente:

```typescript
// app-routing.module.ts
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth.module')
  },
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/dashboard/dashboard.module')
      },
      {
        path: 'documentos',
        loadChildren: () => import('./features/documents/documents.module')
      },
      // ... otras rutas hijas
    ]
  }
];
```

### Explicación del Routing

1. La ruta raíz redirige a login
2. El componente MainLayout actúa como contenedor para todas las rutas dentro de /dashboard
3. Cada módulo funcional tiene sus propias rutas hijas
4. Se utiliza lazy loading para optimizar la carga inicial

## Creación de Nuevos Componentes

Para mantener la consistencia del proyecto, usar el siguiente comando al crear nuevos componentes:

```bash
ng generate component features/[MODULO]/components/[NOMBRE] --standalone=false --skip-tests
```

Ejemplo:
```bash
ng generate component features/documents/components/document-viewer --standalone=false --skip-tests
```

## Principios de Diseño

### SOLID

1. **Single Responsibility Principle (SRP)**
   - Cada componente/servicio tiene una única responsabilidad
   - Ejemplo: NotificationService solo maneja notificaciones

2. **Open/Closed Principle (OCP)**
   - Uso de interfaces y clases abstractas
   - Componentes extensibles sin modificar código existente

3. **Interface Segregation**
   - Interfaces pequeñas y específicas
   - Modelos de datos bien definidos

4. **Dependency Injection**
   - Uso del sistema de DI de Angular
   - Servicios inyectables y singleton cuando corresponde

### Atomic Design

1. **Átomos**: Componentes básicos (botones, inputs)
2. **Moléculas**: Combinaciones de átomos (formularios)
3. **Organismos**: Secciones completas (headers, sidebars)
4. **Templates**: Layouts y estructuras
5. **Páginas**: Vistas completas

## Diseño Responsivo

El proyecto utiliza un sistema de diseño responsivo basado en:

1. **CSS Grid y Flexbox**
   ```css
   .grid-container {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
     gap: 1rem;
   }
   ```

2. **Media Queries**
   ```css
   @media (max-width: 768px) {
     .container {
       flex-direction: column;
     }
   }
   ```

3. **Variables CSS**
   ```css
   :root {
     --primary-color: #091a52;
     --secondary-color: #e6bc10;
   }
   ```

## Buenas Prácticas

1. **Pipes Personalizados**
   - LineBreakPipe para formateo de texto
   - GroupByPipe para agrupación de datos

2. **Servicios**
   - Singleton para estado global
   - Servicios específicos por módulo

3. **Lazy Loading**
   - Carga bajo demanda de módulos
   - Optimización de rendimiento

4. **Componentes Inteligentes vs Presentacionales**
   - Smart Components: Manejan lógica y estado
   - Dumb Components: Solo presentación

## Tips para Desarrollo

1. Mantener componentes pequeños y enfocados
2. Usar TypeScript de manera estricta
3. Seguir el patrón de diseño establecido
4. Documentar código complejo
5. Mantener la consistencia en nombrado

## Contribución

1. Crear una rama para cada feature
2. Seguir las guías de estilo establecidas
3. Documentar cambios importantes
4. Realizar pruebas antes de PR

## Comandos Útiles

```bash
# Desarrollo
ng serve -o                 # Iniciar servidor de desarrollo
ng build                    # Construir proyecto
ng generate module [nombre] # Crear nuevo módulo
ng generate service [nombre] # Crear nuevo servicio
```

## Recursos Adicionales

- [Angular Documentation](https://angular.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Angular Material](https://material.angular.io/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
