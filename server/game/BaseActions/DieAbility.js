const ThenAbility = require('../ThenAbility');

class DieAbility extends ThenAbility {
    constructor(die, properties) {
        super(die.game, die, properties);
        this.die = die;
        this.title = properties.title ? properties.title : 'Power Ability';
    }

    meetsRequirements(context = this.createContext(), ignoredRequirements = []) {
        if (
            //todo: bit of a guess here - assuming there's a 'cannot exhaust dice type thing' ?
            !ignoredRequirements.includes('cannotTrigger') &&
            (!context.player.checkRestrictions('use', context) ||
                !context.source.checkRestrictions('use', context))
        ) {
            return 'cannotTrigger';
        }

        return super.meetsRequirements(context);
    }

    // todo: needed?
    // eslint-disable-next-line no-unused-vars
    addSubEvent(event, context) {
        return;
    }

    isAction() {
        return true;
    }

    isCardAbility() {
        return false;
    }
}

module.exports = DieAbility;
