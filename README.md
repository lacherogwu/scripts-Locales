## How to use?

## Requirements

**Node v15 is required**

### Import

The import function will be used to generate a file for the translators.

Add your ./en.json file and run `npm run import`

It will generate a file called "translations.csv" with the key and the EN value.
Before sending the file to translators, add in the headers the languages names and change the format to .xlsx.

### Export

The export function will be used to generate the locales files

Add the translated file with all the languages to ./file.xlsx and run `npm run export`

It will generate all the locales files in the ./locales folder

**Enjoy**
