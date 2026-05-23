# Esportazione e pubblicazione di Storybook

Questo progetto include uno script per esportare la build statica di Storybook e copiarla direttamente nel progetto principale simonegentili.com.

## Come pubblicare Storybook

1. **Costruisci ed esporta Storybook:**

   ```sh
   npm run export-storybook
   ```

   Questo comando:
   - Esegue la build statica di Storybook (output in `storybook-static`)
   - Copia tutti i file generati in `../simonegentili.com/public/storybook/`

2. **Verifica l'integrazione:**
   - I file statici saranno disponibili in simonegentili.com all'indirizzo `/public/storybook/`.
   - Puoi ora pubblicare o servire il sito principale con Storybook incluso.

## Note
- Assicurati che la cartella di destinazione esista o che lo script abbia i permessi per crearla.
- Puoi personalizzare la destinazione modificando `scripts/export-storybook.sh`.
