describe('Undying heart', function () {
    beforeEach(function () {
        this.setupTest({
            player1: {
                phoenixborn: 'aradel-summergaard',
                inPlay: ['mist-spirit', 'blue-jaguar', 'anchornaut'],
                dicepool: ['natural', 'illusion', 'charm', 'charm'],
                spellboard: [],
                hand: ['close-combat', 'undying-heart']
            },
            player2: {
                phoenixborn: 'coal-roarkwin',
                inPlay: ['iron-worker'],
                spellboard: ['summon-iron-rhino'],
                hand: ['molten-gold'],
                dicepool: ['natural', 'natural', 'charm', 'charm']
            }
        });
    });

    it('modifies card stats', function () {
        this.player1.clickCard(this.undyingHeart); // play card
        this.player1.clickPrompt('Play this alteration');
        this.player1.clickCard(this.mistSpirit); // attach to ms

        expect(this.mistSpirit.life).toBe(2);
        expect(this.mistSpirit.recover).toBe(1);

        expect(this.mistSpirit.effects.length).toBe(3); // two modifies and a destroyed
    });

    it('returns destroyed ally to hand after ATTACK', function () {
        this.player1.clickCard(this.undyingHeart); // play card
        this.player1.clickPrompt('Play this alteration');
        this.player1.clickCard(this.anchornaut); // attach
        expect(this.undyingHeart.location).toBe('play area');
        expect(this.anchornaut.effects.length).toBe(3);
        this.player1.clickPrompt('End Turn');
        this.player1.clickPrompt('Yes');

        this.player2.clickPrompt('Attack');
        this.player2.clickCard(this.anchornaut);
        this.player2.clickCard(this.ironWorker);
        this.player1.clickPrompt('Done'); // no guard
        this.player1.clickPrompt('No'); // no counter
        expect(this.undyingHeart.location).toBe('discard');
        expect(this.anchornaut.location).toBe('hand');
    });

    it('returns destroyed ally to hand after MG', function () {
        this.player1.clickCard(this.undyingHeart); // play card
        this.player1.clickPrompt('Play this alteration');
        this.player1.clickCard(this.anchornaut); // attach
        expect(this.undyingHeart.location).toBe('play area');
        expect(this.anchornaut.effects.length).toBe(3);
        this.player1.clickPrompt('End Turn');
        this.player1.clickPrompt('Yes');

        this.player2.clickCard(this.moltenGold);
        this.player2.clickPrompt('Play this Action');
        this.player2.clickCard(this.anchornaut);
        expect(this.undyingHeart.location).toBe('discard');
        expect(this.anchornaut.location).toBe('hand');
    });

    it('doesnt return conjuration to hand', function () {
        this.player1.clickCard(this.undyingHeart); // play card
        this.player1.clickPrompt('Play this alteration');
        this.player1.clickCard(this.mistSpirit); // attach to ms

        this.player1.clickPrompt('End Turn');
        this.player1.clickPrompt('Yes');
        this.player2.clickPrompt('Attack');
        this.player2.clickCard(this.mistSpirit);
        this.player2.clickCard(this.ironWorker);
        this.player1.clickPrompt('Done');
        this.player1.clickPrompt('No'); // no counter

        expect(this.mistSpirit.location).toBe('archives');
    });
});
