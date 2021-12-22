import { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getGames } from "../api/api";

const renderGameList = (games) => {
  return games.map((game) => {
            return (
              <Col xs={6} md={1} key={game.id}>
                <Link to={`/games/${game.id}/`}>
                  <Image src={game.cover_url} rounded fluid>

                  </Image>
                </Link>
              </Col>
            );
          })
}

const renderCategories = (categories) => {
  return Object.keys(categories).map((category) => {
    return <Row key={category} className='my-4 mx-4'>
      <h1 className="display-6">{category}</h1>
      {categories[category] && renderGameList(categories[category])}
      </Row>;
  })
}

const splitGamesByCategory = (games) => {
  const output = {
    'Souls-like': [],
    'Factory Builder': [],
    'Action': []
  }
  games.forEach(game => {
    output[game.category] = [...output[game.category], game]
  })
  return output;
}

const GameList = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    const loadGames = async () => {
      let data = await getGames();
      data = splitGamesByCategory(data)
      setGames(data);
    };

    loadGames();
  }, []);

  return (
    <Container fluid>
      <Row>
        {games && renderCategories(games) }
      </Row>
    </Container>
  );
};

export default GameList;
