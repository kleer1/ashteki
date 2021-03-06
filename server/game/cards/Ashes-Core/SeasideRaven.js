const Card = require('../../Card.js');

class SeasideRaven extends Card {
    setupCardAbilities(ability) {
        this.entersPlay({
            effect: 'destroy a target unit',
            target: {
                activePromptTitle: 'Prey 2',
                cardType: ['Ally', 'Conjuration'],
                controller: 'opponent',
                cardCondition: (card) => card.life <= 2,
                gameAction: ability.actions.destroy()
            }
        });

        this.persistentEffect({
            effect: ability.effects.quickStrike()
        });
    }
}

SeasideRaven.id = 'seaside-raven';

module.exports = SeasideRaven;
