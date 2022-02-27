import axios from "axios";


/**
 * Fetch all beers
 *
 * @returns {Promise}
 */
export const getAllBeers = () => axios.get(`${process.env.REACT_APP_CONFIG_PROTOCOL}://${process.env.REACT_APP_CONFIG_URL}/v2/beers`).then((response) => response.data)
