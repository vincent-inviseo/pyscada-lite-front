
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvFormatValidatorService {

  constructor() { }

  async validateCsvFormat(file: File): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let isValidFormat = true;
      // Utilisez FileReader ou une autre méthode pour lire le contenu du fichier
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target?.result as string;
        if(! fileContent) {
          reject(false)
        }
        const lines = fileContent?.split('\n');

        lines.forEach((line) => {
          // Utilisez csv-parser pour vérifier la validité du format de chaque ligne
          const csvParser = require('csv-parser');
          csvParser()
            .on('data', (data:any) => {
              // Vérifiez ici la validité du format des données dans 'data'
              // Si les données ne sont pas conformes, définissez isValidFormat sur false
              // Exemple de vérification : if (!isValid(data)) isValidFormat = false;
              // Par exemple pour transformer des dates
            })
            .on('end', () => resolve(isValidFormat))
            .on('error', (error:any) => {
              isValidFormat = false;
              reject(error);
            });
          });
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsText(file);
    });
  }
}