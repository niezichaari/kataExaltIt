import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllBeers } from '../services/beerService';
import { beerSliceActions } from '../store/beer-slice';
import { Button, Col, Container, Form, FormControl, Pagination, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import BeerList from './BeerList';
import { Link } from 'react-router-dom';


function App() {
  const [init, setInit] = useState(false)
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(7);
  const beers = useSelector(
    (state) => state.beerSlice.beers,
  )
  const [filtredBeer, setFiltredBeer] = useState(beers);
  const dispatch = useDispatch()
  let paginationItems = [];

  /**
   * Create & Update Pagination
   *
   * @param {object} beerToPaginate
   */
  const UpdatePagination = (beerToPaginate) => {
    paginationItems = [];
    if (beerToPaginate) {
      for (let number = 1; number <= Math.round(beerToPaginate.length / postsPerPage); number++) {
        paginationItems.push(
          <Pagination.Item key={number} active={number - 1 === currentPage}
            onClick={() =>
              setCurrentPage(number - 1)
            }>
            {number}
          </Pagination.Item >,
        );
      }
    }
  }

  /**
  update Pagination if search beer activated
   */
  if (!filtredBeer) {
    UpdatePagination(beers)
  }
  else {
    UpdatePagination(filtredBeer)
  }

  useEffect(() => {
    if (!init) {
      getAllBeers().then((Response) => {
        dispatch(beerSliceActions.setBeers(Response))
        setInit(true)
      })
    }

  }, [init, beers, dispatch])

  if (init && beers) {
    return (
      <Container className='Container'>
        <Row>
          <Col>
            <Link to={{
              pathname: '/beerCart',
            }} >
              <Button variant="primary" >Beer cart</Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            Beers per page : {postsPerPage}
          </Col>

          <Col md={6}>
            <FormControl
              placeholder="Find a Beed"
              onChange={(e) => {
                setCurrentPage(0)
                setFiltredBeer(beers.filter((beer) => {
                  if (e.target.value === "") {
                    return beer
                  }
                  return beer.name.toLowerCase().includes(e.target.value.toLowerCase())
                }))
              }}
            />          </Col>
          <Col md={9}>
            <Form.Range
              className='w-25'
              min="1"
              max={beers.length}
              defaultValue={postsPerPage}
              onChange={(e) => {
                console.log(e.target.value)
                setPostsPerPage(e.target.value)
              }} />
          </Col>

        </Row>
        <BeerList beers={filtredBeer ? filtredBeer.slice(currentPage * postsPerPage, (currentPage + 1) * postsPerPage) : beers.slice(currentPage * postsPerPage, (currentPage + 1) * postsPerPage)} />


        <Row className='fixed-bottom'>
          <Pagination className='d-flex justify-content-center'>
            <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0} />
            {paginationItems}
            <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage + 1 >= Math.round((filtredBeer ? filtredBeer.length : beers.length) / postsPerPage)} />
          </Pagination>

        </Row>
      </Container>

    );
  }
  return (
    <span className="position-absolute">Loading...</span>
  )
}

export default App;
