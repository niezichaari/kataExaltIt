import { Button, Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BeerCart = (props) => {
    const orderedBeer = useSelector(
        (state) => state.cartSlice.order,
    )

    if (orderedBeer) {
        return (
            <Container>
                <Link to={{
                    pathname: '/beerList',
                }} >
                    <Button variant="primary" >Beer List</Button>
                </Link>
                <Table>
                    <tbody>
                        {orderedBeer.map((beer, index) => <tr key={index}>
                            <td>
                                {beer.name}
                            </td>
                            <td>
                                <img className='beerPhoto' src={beer.image_url} alt="beer" />
                            </td>
                        </tr>)
                        }
                    </tbody>
                </Table>
            </Container>
        )
    }

}
export default BeerCart;