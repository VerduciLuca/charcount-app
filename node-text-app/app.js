const fs = require('fs');
const _ = require('lodash');


const readFileAndProcess = (filename) => {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {

        console.error('Errore:', err);
        return;
        }

        const charactersCount = data.replace(/\s/g, '').length; //la regex sostituisce gli spazi globali con una stringa vuota

        const wordsCount = data.split(/\s+/).filter(word => word !== '').length; //filter per restituire tutti ciò che non è uno spazio dopo la split

        const characterOccurrences = _.countBy(data.replace(/\s/g, '')); //countby sta contando carattere per carattere

        const mostFrequentCharacter = Object.entries(characterOccurrences) //entries trasforma gli oggetti in array formati dalle loro key e valori
        .reduce((acc, [char, count]) => (count > acc.count ? { char, count } : acc), { char: '', count: 0 }); //reduce per confrontare le occurences nelle entries

      // Calcola le occorrenze di ciascuna parola nel testo
        const wordOccurrences = _.countBy(data.split(/\s+/).filter(word => word !== ''));

      // Trova la parola con il maggior numero di occorrenze nel testo
        const mostFrequentWord = Object.entries(wordOccurrences)
        .reduce((acc, [word, count]) => (count > acc.count ? { word, count } : acc), { word: '', count: 0 });

      // Genera il contenuto del report da scrivere sul nuovo file
        const reportData = `numero caratteri: ${charactersCount} (non compresi gli spazi)\n` +
        `numero parole: ${wordsCount}\n` +
        `carattere con più occorrenze: ${mostFrequentCharacter.char} (${mostFrequentCharacter.count} occorrenze)\n` +
        `parola con più occorrenze: ${mostFrequentWord.word} (${mostFrequentWord.count} occorrenze)`;

      // Genera il nome del nuovo file report, aggiungendo '-report' al nome originale
        const reportFilename = `${filename.replace(/\.[^/.]+$/, '')}-report.txt`;

      // Scrivi il contenuto del report nel nuovo file
        fs.writeFile(reportFilename, reportData, (err) => {
        if (err) {
          // Se si verifica un errore nella scrittura del file report, stampa un messaggio di errore
            console.error('Errore nella scrittura del file report:', err);
            return;
        }
        // Se la scrittura è andata a buon fine, stampa un messaggio di conferma
        console.log(`Report generato correttamente nel file: ${reportFilename}`);
        });
    });
    };
    
  // Verifica se è stato passato un nome di file come argomento da linea di comando
  const filename = process.argv[2];
  if (!filename) {
    // Se non è stato passato alcun nome di file, stampa un messaggio di errore e termina il programma
    console.error('Passare il nome del file come argomento da linea di comando.');
  } else {
    // Se è stato passato un nome di file, esegui la funzione readFileAndProcess con il nome del file come argomento
    readFileAndProcess(filename);
  }
