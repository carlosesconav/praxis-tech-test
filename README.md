# Proyecto Microservicios - Procesador de pagos y Worker de notificaciones

Este proyecto contiene dos microservicios (`pay-process-service` y `notification-pay-service`) conectados a una base de datos MySQL y a un servidor de RabbitMQ usando Docker.  

## Requisitos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Node 22LTS (para desarrollo local si deseas correr sin Docker)

## Estructura del proyecto

```
.
├── notification-pay-service/       # Microservicio de Pagos
├── pay-process-service/        # Microservicio de Notificaciones
├── docker-compose.yml
└── README.md
```

## Configuración

### Docker Compose

El archivo `docker-compose.yml` ya configura:

- MySQL 8 con base de datos `txtest`
- Usuario root sin contraseña `root`
- Microservicios `pay-process-service` (puerto 3000) conectado a una base de datos MySQL, siendo publisher de RabbitMQ y `notification-pay-service` Como consumer de RabbitMQ 

> ⚠️ Se recomienda no usar `root` en producción. Se puede crear un usuario normal para los servicios.

## Cómo iniciar el proyecto

1. Construir y levantar los contenedores:

```bash
docker-compose up --build
```

2. Espera a que MySQL esté listo (el healthcheck tarda unos segundos).  

3. Accede a los microservicios:  

- pay-process-service: [http://localhost:3000](http://localhost:3000)
- notification-pay-service: Server RabbitMQ -> [http://localhost:5672](http://localhost:5672)

4. Para detener los contenedores:

```bash
docker-compose down
```

5. Para reiniciar sin reconstruir:

```bash
docker-compose up
```

## Volúmenes

La base de datos MySQL persiste en el volumen `mysql_data`:

```yaml
volumes:
  db_data:
```
