# dinner

## Develop

Devcontainers
MAKE SURE YOU MIGRATE THE DB before trying stuff 


## Runbook
```
docker-compose up --build server envoy frontend
```

### migrations

```
EXPORT DATABASE_URL=postgres://<USER>:<ADMIN>@localhost:8002/dinner
sqlx database drop
sqlx database create
sqlx migrate run
```

### Deploy

Tag release