const { CardType } = require('../../constants');
const BaseStepWithPipeline = require('./basestepwithpipeline');
const SimpleStep = require('./simplestep');

class BattleStep extends BaseStepWithPipeline {
    constructor(game, attack) {
        super(game);
        this.attack = attack;
        this.chosenBattle = null;
        let steps = [
            // prompt for battle
            new SimpleStep(this.game, () => this.chooseBattle()),
            new SimpleStep(this.game, () => this.promptForCounter()),
            new SimpleStep(this.game, () => this.resolveBattle()),
            new SimpleStep(this.game, () => this.exhaustParticipants())
        ];

        this.pipeline.initialise(steps);
    }

    chooseBattle() {
        const unresolvedBattles = this.attack.battles.filter((b) => b.resolved === false);
        if (unresolvedBattles.length > 1) {
            this.game.promptForSelect(this.attack.attackingPlayer, {
                activePromptTitle: 'Choose a fight to resolve',
                controller: 'self',
                cardCondition: (card) => unresolvedBattles.map((b) => b.attacker).includes(card),
                onSelect: (player, card) => {
                    this.chosenBattle = unresolvedBattles.find((b) => b.attacker === card);
                    return true;
                }
            });
        } else {
            this.chosenBattle = unresolvedBattles[0];
        }
    }

    promptForCounter() {
        // battle.guard here holds a blocker or a guard
        if (this.chosenBattle.guard) {
            // if it's not a pb guard then counter - blockers always counter IF not exhausted
            this.chosenBattle.counter =
                this.chosenBattle.guard.type !== CardType.Phoenixborn &&
                !this.chosenBattle.guard.exhausted;
            return true;
        }

        if (this.attack.isPBAttack || this.chosenBattle.target.exhausted) {
            // don't ask to counter with phoenixborn (they don't have an attack value)
            // and exhausted targets cannot counter
            this.chosenBattle.counter = false;
            return true;
        }

        this.game.promptWithHandlerMenu(this.attack.defendingPlayer, {
            activePromptTitle: 'Do you want to counter?',
            mode: 'select',
            choices: ['Yes', 'No'],
            handlers: [
                () => (this.chosenBattle.counter = true),
                () => (this.chosenBattle.counter = false)
            ]
        });
    }

    resolveBattle() {
        this.game.actions
            .resolveBattle({ battle: this.chosenBattle })
            .resolve(null, this.game.getFrameworkContext(this.game.activePlayer));
    }

    exhaustParticipants() {
        let battle = this.chosenBattle;
        let participants = [battle.attacker];
        // if there's a guard or blocker, they counter and so exhaust
        // otherwise if the target counters (was not guarded or blocked) they exhaust
        if (
            battle.guard &&
            battle.guard.type !== CardType.Phoenixborn &&
            battle.guard.exhaustsOnCounter()
        ) {
            participants.push(battle.guard);
        } else if (battle.counter && battle.target.exhaustsOnCounter()) {
            participants.push(battle.target);
        }
        // phoenixborn don't exhaust, but are marked as having guarded this round
        if (battle.guard && battle.guard.type === CardType.Phoenixborn) {
            this.game.actions
                .setGuarded()
                .resolve(battle.guard, this.game.getFrameworkContext(this.game.activePlayer));
        }

        this.game.actions
            .exhaust()
            .resolve(participants, this.game.getFrameworkContext(this.game.activePlayer));
    }
}

module.exports = BattleStep;
