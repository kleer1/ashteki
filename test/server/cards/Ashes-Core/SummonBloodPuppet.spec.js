describe('Summon Blood Puppet', function () {
    describe('positive tests', function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    phoenixborn: 'aradel-summergaard',
                    inPlay: [],
                    spellboard: ['summon-blood-puppet'],
                    dicepool: ['natural', 'ceremonial', 'charm', 'charm'],
                    archives: ['blood-puppet']
                },
                player2: {
                    phoenixborn: 'coal-roarkwin',
                    inPlay: [],
                    spellboard: []
                }
            });
        });

        it('should place a blood puppet onto own battlefield', function () {
            this.player1.clickCard(this.summonBloodPuppet);
            this.player1.clickPrompt('Summon Blood Puppet');
            this.player1.clickPrompt('Mine');
            this.player1.clickCard(this.bloodPuppet);

            // Blood puppet is now on the battlefield
            expect(this.player1.inPlay.length).toBe(1);
            expect(this.player2.inPlay.length).toBe(0);
        });

        it('should place a blood puppet onto opponents battlefield', function () {
            this.player1.clickCard(this.summonBloodPuppet);
            this.player1.clickPrompt('Summon Blood Puppet');
            this.player1.clickPrompt("Opponent's");
            this.player1.clickCard(this.bloodPuppet);

            // Blood puppet is now on the battlefield
            expect(this.player1.inPlay.length).toBe(0);
            expect(this.player2.inPlay.length).toBe(1);
        });
    });

    describe('negative tests', function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    phoenixborn: 'aradel-summergaard',
                    inPlay: [],
                    spellboard: ['summon-blood-puppet'],
                    dicepool: ['natural', 'ceremonial', 'charm', 'charm'],
                    archives: ['blood-puppet']
                },
                player2: {
                    phoenixborn: 'maeoni-viper',
                    inPlay: ['anchornaut', 'anchornaut', 'hammer-knight', 'hammer-knight'],
                    spellboard: []
                }
            });
        });

        it('should NOT place a blood puppet onto full opponents battlefield', function () {
            expect(this.player2.phoenixborn.battlefield).toBe(4); // make sure we're full
            expect(this.player2.player.isBattlefieldFull()).toBe(true);
            this.player1.clickCard(this.summonBloodPuppet);
            this.player1.clickPrompt('Summon Blood Puppet');
            this.player1.clickPrompt("Opponent's");
            this.player1.clickCard(this.bloodPuppet);

            // Blood puppet is now on the battlefield
            expect(this.player1.inPlay.length).toBe(0);
            expect(this.player2.inPlay.length).toBe(4);
        });
    });
});
