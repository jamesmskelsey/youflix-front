import { useEffect, useState } from "react";
import { Container, Row, Button, Image, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import {
  getGame,
  getPlayListsForGame,
  addToWatchList,
  getWatchListItems,
} from "../api/api";
import { getGameDBData } from "../api/games_api";

const GameDetailPage = () => {
  const { game_id } = useParams();

  const [playlists, setPlaylists] = useState([]);
  const [game, setGame] = useState({});
  const [gameData, setGameData] = useState({});
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const loadWatchlist = async () => {
      const data = await getWatchListItems();
      setWatchlist(data);
    };

    loadWatchlist();
  }, []);

  useEffect(() => {
    const loadPlaylists = async () => {
      const data = await getPlayListsForGame(game_id);
      setPlaylists(data);
    };

    const loadGameDB = async (id) => {
      const data = await getGameDBData(id);
      console.log(data);
      setGameData(data);
    };

    const loadGame = async () => {
      const data = await getGame(game_id);
      setGame(data);
      loadGameDB(data.game_db_url);
    };

    loadPlaylists();
    loadGame(game_id);
  }, [game_id]);

  const handleClickAddWatchItem = async (id) => {
    const watch = await addToWatchList(id);
    setWatchlist([...watchlist, watch]);
  };

  const isInWatchlist = (playlist_id) => {
    return watchlist.map((watch) => (watch && watch.playlist.id) || false).includes(playlist_id);
  };

  return (
    <Container>
      <Row>
        <Col md={3}>
          <Image src={game.cover_url}></Image>
        </Col>
        <Col md={9}>
          <h1>{game.name}</h1>
          <p>{gameData.storyline}</p>
          <p>{gameData.summary}</p>
        </Col>
      </Row>
      <Row>
        <h2 className="display-6">Playlists</h2>
        {playlists &&
          playlists.map((playlist) => {
            return (
              <Col key={playlist.id}>
                <Link to={`/playlists/${playlist.id}`}>
                  <Image src={playlist.cover_url} />
                </Link>
                
                <p>by {playlist.creator}</p>
                {!isInWatchlist(playlist.id) ? (
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => handleClickAddWatchItem(playlist.id)}
                  >
                    Add to Watchlist
                  </Button>
                ) : (
                  <Link to="/watchlist">View Watchlist</Link>
                )}
                

                
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default GameDetailPage;
