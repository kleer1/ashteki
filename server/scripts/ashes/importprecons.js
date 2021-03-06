/*eslint no-console:0 */
const monk = require('monk');
const fs = require('fs');
const dataDirectory = 'data/decks/';

const CardService = require('../../services/AshesCardService');
const DeckService = require('../../services/AshesDeckService');
const ConfigService = require('../../services/ConfigService');

let db = monk('mongodb://127.0.0.1:27017/ashteki');

class ImportPrecons {
    constructor() {
        const configService = new ConfigService();
        this.cardService = new CardService(configService);
        this.deckService = new DeckService(configService);
    }

    async import() {
        try {
            this.cards = await this.cardService.getAllCards();

            for (let deck of this.loadDecks()) {
                let existingDeck = await this.deckService.getPreconDeckById(deck.precon_id);
                if (!existingDeck) {
                    console.log('Importing', deck.name);
                    await this.deckService.createPrecon(deck);
                }
            }

            console.log('Done importing precon decks');
        } catch (err) {
            console.error('Could not finish import', err);
        }
    }

    loadDecks() {
        let file = 'precon-core.json';
        let data = fs.readFileSync(dataDirectory + file);
        return JSON.parse(data);
    }

    clearPrecons() {
        this.deckService.clearPrecons();
    }
}

let importer = new ImportPrecons();
Promise.all([importer.clearPrecons(), importer.import()])
    .then(() => db.close())
    .catch(() => db.close());
