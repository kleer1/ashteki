import React from 'react';
import { imageUrl } from '../../util';

import './CardImage.scss';

/**
 * @typedef CardImageProps
 * @property {object} card // The card data to render an image for
 * @property {string} [cardBack] // The card back image to show if not showing the card image
 */

/**
 *
 * @param {CardImageProps} props
 */
const CardImage = ({ card, cardBack }) => {
    let imgPath = card.facedown ? cardBack : imageUrl(card.id);

    return (
        <>
            <img className='img-fluid' src={imgPath} />
        </>
    );
};

export default CardImage;
