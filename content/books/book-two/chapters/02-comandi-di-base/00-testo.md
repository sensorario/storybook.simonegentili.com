# Comandi di base

Il ciclo di vita di un container Docker si gestisce con pochi comandi
fondamentali: costruire o scaricare un'immagine, avviarla e ispezionarla.

```bash
docker pull nginx
docker run -d -p 8080:80 nginx
docker ps
docker logs <container-id>
```

Con questi quattro comandi puoi già avviare e osservare il comportamento
di un servizio containerizzato in locale.
