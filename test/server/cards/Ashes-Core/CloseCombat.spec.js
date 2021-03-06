describe('Close combat played', function () {
    beforeEach(function () {
        this.setupTest({
            player1: {
                phoenixborn: 'aradel-summergaard',
                inPlay: ['iron-rhino', 'mist-spirit', 'blue-jaguar'],
                dicepool: ['natural', 'illusion', 'charm', 'charm'],
                spellboard: ['summon-butterfly-monk'],
                hand: ['close-combat']
            },
            player2: {
                phoenixborn: 'coal-roarkwin',
                inPlay: ['anchornaut', 'iron-worker'],
                spellboard: ['summon-iron-rhino', 'summon-iron-rhino', 'chant-of-revenge']
            }
        });
    });

    it('exhaust choice for my unit', function () {
        this.player1.clickCard(this.closeCombat); // play card
        this.player1.clickPrompt('Play this action');
        this.player1.clickCard(this.mistSpirit); // choose ms for 1 damage
        this.player1.clickCard(this.ironWorker); // choose iw to take 1

        this.player1.clickPrompt('Exhaust');

        expect(this.ironWorker.damage).toBe(1);
        expect(this.mistSpirit.exhausted).toBe(true);
    });

    it('wounds choice for my unit', function () {
        this.player1.clickCard(this.closeCombat); // play card
        this.player1.clickPrompt('Play this action');
        this.player1.clickCard(this.blueJaguar); // choose ms for 1 damage
        this.player1.clickCard(this.ironWorker); // choose iw to take 1

        this.player1.clickPrompt('Wound');

        expect(this.ironWorker.damage).toBe(1);
        expect(this.blueJaguar.exhausted).toBe(false);
        expect(this.blueJaguar.damage).toBe(1);
    });
});
