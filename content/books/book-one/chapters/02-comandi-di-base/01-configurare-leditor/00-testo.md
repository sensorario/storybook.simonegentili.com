## Configurare l'editor

Prima di iniziare conviene configurare l'editor che Git userà per i
messaggi di commit e per risolvere eventuali conflitti.

![Schermata di esempio di configurazione dell'editor](content/shared/assets/placeholder.png)

```bash
git config --global core.editor "code --wait"
```

Da questo momento, ogni volta che Git avrà bisogno di aprire un editor di
testo (ad esempio durante un `git commit` senza `-m`), userà quello scelto.
