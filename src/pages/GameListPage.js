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

const GameListPage = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    const loadGames = async () => {
      const data = await getGames();
      setGames(data);
    };

    loadGames();
  }, []);

  return (
    <Container fluid>
      <Row>
        <h1 className="display-6">Games</h1>
      </Row>
      <Row>
        {games && renderGameList(games) }
      </Row>
    </Container>
  );
};

export default GameListPage;
