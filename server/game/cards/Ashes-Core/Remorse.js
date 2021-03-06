const Card = require('../../Card.js');

class Remorse extends Card {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onAttackersDeclared: (event, context) =>
                    event.attackingPlayer === context.source.owner.opponent
            },
            effect: 'discard 2 cards from top of deck',
            gameAction: ability.actions.discardTopOfDeck({ amount: 2 }),
            then: {
                condition: (context) => context.player.opponent.deck.length === 0,
                gameAction: ability.actions.dealDamage((context) => ({
                    amount: 2,
                    target: context.player.opponent.phoenixborn
                }))
            }
        });
    }
}

Remorse.id = 'remorse';

module.exports = Remorse;
