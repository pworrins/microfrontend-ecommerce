import {

  notify

} from '../../../shared/src';

// ==========================================================
// Example Add To Cart
// ==========================================================

export const showAddToCartNotification = (

  productName: string

) => {

  notify(

    'success',

    `"${productName}" berhasil ditambahkan ke keranjang!`

  );

};