const { BattlefieldTypes } = require('../../../constants.js');
const Card = require('../../Card.js');

class ParticleShield extends Card {
    setupCardAbilities(ability) {
        this.interrupt({
            when: {
                onDamageDealt: (event, context) =>
                    BattlefieldTypes.includes(event.card.type) &&
                    event.card.controller == context.player
            },
            gameAction: ability.actions.changeEvent((context) => ({
                event: context.event,
                amount: context.event.amount - 1
            })),
            then: () => ({
                gameAction: ability.actions.draw()
            })
        });
    }
}

ParticleShield.id = 'particle-shield';

module.exports = ParticleShield;
