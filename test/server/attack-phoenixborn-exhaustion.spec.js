describe('During attack on Phoenixborn', function () {
    beforeEach(function () {
        this.setupTest({
            player1: {
                phoenixborn: 'coal-roarkwin',
                inPlay: ['sonic-swordsman', 'iron-worker']
            },
            player2: {
                phoenixborn: 'aradel-summergaard',
                inPlay: ['anchornaut', 'mist-spirit']
            }
        });
    });

    it('side effect exhaustion of blocker prevents counter', function () {
        expect(this.ironWorker.damage).toBe(0); // will check damage from mist spirit

        this.player1.clickPrompt('Attack');
        this.player1.clickCard(this.aradelSummergaard); // target pb
        this.player1.clickCard(this.sonicSwordsman);
        this.player1.clickCard(this.ironWorker); // 2 attackers
        this.player1.clickPrompt('Done'); // end attacker choice

        // defender 1
        this.player2.clickCard(this.anchornaut);
        this.player2.clickCard(this.sonicSwordsman);

        // defender 2
        this.player2.clickCard(this.mistSpirit);
        this.player2.clickCard(this.ironWorker);

        expect(this.player1).toHavePrompt('Choose a fight to resolve');
        this.player1.clickCard(this.sonicSwordsman);
        expect(this.player1).toHavePrompt('Sonic Pulse 1');
        this.player1.clickCard(this.mistSpirit); // sonic pulse target

        expect(this.anchornaut.isInPlay).toBe(false); // killed by sonicswordsman
        expect(this.mistSpirit.isInPlay).toBe(false); // killed by ironWorker
        expect(this.sonicSwordsman.exhausted).toBe(true); // attacked
        expect(this.ironWorker.exhausted).toBe(true); // attacked
        // second battle auto-resolves - defender has been exhausted
        expect(this.ironWorker.damage).toBe(0); // no counter from mist spirit
    });
});
