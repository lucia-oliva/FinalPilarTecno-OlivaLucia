# Wedding Planner (React)

SPA en React para gestionar **eventos** (listado, detalle y CRUD), con **auth por roles** (admin / usuario), **rutas protegidas** y **API mock**
Para el desarrollo de este intregrador se utilizo como referencia la API creada en el modulo de node, el cual es una api para gestion de eventos.

Link del repositorio de la API: https://github.com/lucia-oliva/API_CRUD-OlivaLucia
---

## Roles

- **Admin**: crear, editar y eliminar eventos.  **Usuario DEMO**: ana@demo.com **PASS:** admin123
- **Usuario**: reservar (anotarse) si hay cupos.  **Usuario DEMO**: juan@demo.com **PASS:** user123
  
---

## Stack

- React , React Router v6  
- MUI + CSS  
- Context API (Auth)  
- Mock API
  
---

## 🗂️ Rutas

- / → Home
- /eventos → Listado 
- /eventos/:id → Detalle 
- /eventos/nuevo → Crear (solo admin)
- /eventos/:id/editar → Editar (solo admin)
- /login → Login

---

## 🚧 **Pendiente de Desarrollo**

- Pagina Crear y Editar
- Boton y funcionalidad Reservar
- Mejoras en diseño, responsabilidad y accesibilidad.





