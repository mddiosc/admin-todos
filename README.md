# Development

Pasos para levantar la app en desarrollo

1. levantar la base de datos

```
docker compose up -d
```

2. Renombrar el .env.template a .env
3. Reemplazar las variables de entorno
4. Ejecutar

```
npm install
```

5. ejecutar

```
npm run dev
```

6. Ejecutar comandos de prisma:

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

7. Ejecutar el SEED para [crear la base de datos](localhost:3000/api/seed)

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
