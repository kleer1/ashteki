const CardGameAction = require('./CardGameAction');

class FightGameAction extends CardGameAction {
    setup() {
        this.name = 'fight';
        this.targetType = ['Ally', 'Conjuration'];
        this.effectMsg = 'fight with {0}';
    }

    canAffect(card, context) {
        let fightAction = card.getFightAbility();
        let newContext = fightAction.createContext(context.player);
        if (!fightAction || fightAction.meetsRequirements(newContext, ['stunned'])) {
            return false;
        }

        return card.checkRestrictions('use', context) && super.canAffect(card, context);
    }

    getEvent(card, context) {
        return super.createEvent('onInitiateFight', { card, context }, () => {
            let fightAction = card.getFightAbility();
            let newContext = fightAction.createContext(context.player);
            newContext.canCancel = false;
            context.game.resolveAbility(newContext);
            context.game.raiseEvent('onUseCard', { card: card, context: context });
        });
    }
}

module.exports = FightGameAction;
