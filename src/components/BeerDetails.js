import { useState } from "react";
import { Badge, Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkCart } from "../tools/CartTools";

const BeerDetails = (props) => {
    const orders = useSelector(
        (state) => state.cartSlice.order,
    )
    const [beer] = useState(props.location.state.beer);
    const [ingredients] = useState(beer.ingredients);

    if (beer) {
        return (
            <Container>
                <Row>
                    <Col>
                        <Link to={{
                            pathname: '/beerList',
                        }} >
                            <Button variant="primary" >Beer List</Button>
                        </Link>
                    </Col> <Col><Link to={{
                        pathname: '/beerCart',
                    }} >
                        <Button variant="primary" >Beer cart</Button>
                    </Link>
                    </Col>
                </Row>
                <br />

                <Card>
                    <Card.Header>
                        <Card.Title>{beer.name} {checkCart(beer, orders) ? <Badge bg="success">Ordered</Badge> : null}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Img variant="top" className="beerPhotoLg img-fluid" src={beer.image_url} />
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <td>Description</td>
                                    <td>
                                        {beer.description}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Volume</td>
                                    <td>{beer.volume.value}/{beer.volume.unit}</td>
                                </tr>
                                <tr>
                                    <td>Ingredients</td>
                                    <td>
                                        {ingredients?.hops.map((aHops, key) => <div key={key}>
                                            {aHops.name}/{aHops.amount.value}{aHops.amount.unit}
                                        </div>)}
                                        {ingredients?.malt.map((aMalt, key) => <div key={key}>
                                            {aMalt.name}/{aMalt.amount.value}{aMalt.amount.unit}
                                        </div>)}
                                        <br />
                                        {ingredients?.yeast}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Brewers tips</td>
                                    <td>{beer.brewers_tips}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container >
        )
    }

}
export default BeerDetails;