## Volumi e reti

I container sono effimeri per natura: quando vengono rimossi, i dati al
loro interno vanno persi. I volumi risolvono questo problema.

![Schermata di esempio di un volume Docker montato](content/shared/assets/placeholder.png)

```bash
docker volume create dati-app
docker run -d -v dati-app:/var/lib/app nginx
```

Le reti Docker, invece, permettono a più container di comunicare tra loro
in modo isolato dal resto del sistema.
