/**
 * check beer in the cart
 *
 * @param {object} beer
 * @returns
 */
export const checkCart = (beer, orders) => {
    let cartCheckResult
    if (orders) {
        cartCheckResult = orders.find(order => order.id === beer.id)
    }
    return cartCheckResult
}