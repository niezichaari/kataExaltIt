import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartSliceActions } from "../store/cart-slice";
import { checkCart } from "../tools/CartTools";

const BeerList = (props) => {
    const [beers, setBeers] = useState(props.beers);
    const dispatch = useDispatch()
    const orders = useSelector(
        (state) => state.cartSlice.order,
    )

    useEffect(() => {
        if (beers !== props.beers) {
            setBeers(props.beers)
        }
    }, [beers, props.beers]);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Beer Name</th>
                    <th>Volume</th>
                    <th>Photo</th>
                    <th>Add/Remove</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {beers?.map((beer, index) =>
                    <tr key={index}>
                        <td>{beer.name}</td>
                        <td>{beer.volume.value}/{beer.volume.unit}</td>
                        <td>
                            <img className='beerPhoto' src={beer.image_url} alt="beer" />
                        </td>
                        <td>

                            {checkCart(beer, orders) ? <Button variant="danger" className="w-50"

                                onClick={() => {
                                    dispatch(cartSliceActions.removeBeerFromCart(beer))
                                }
                                }>Remove from cart</Button> : <Button variant="primary" className="w-50"

                                    onClick={() => {
                                        dispatch(cartSliceActions.addBeerToCart(beer))
                                    }
                                    }>Add to cart</Button>}
                        </td>

                        <td>
                            <Link to={{
                                pathname: '/details',
                                state: { beer: beer }
                            }} >
                                <Button variant="primary"
                                >Details</Button>
                            </Link>
                        </td>
                    </tr>)
                }
            </tbody>
        </Table >
    )
}

export default BeerList;
