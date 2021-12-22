import { useEffect, useState } from "react";
import { Container, Row, Button, Image, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getWatchListItems, removeFromWatchList } from "../api/api";

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  useEffect(() => {
    const loadWatchlist = async () => {
      const data = await getWatchListItems();
      setWatchlist(data);
    };

    loadWatchlist();
  }, []);

  const handleClickRemoveWatchItem = async (id) => {
    removeFromWatchList(id);
    setWatchlist(watchlist.filter((watch) => watch.id !== id));
  };

  return (
    <Container>
      <h2 className="display-6">My List</h2>
      <Row>
        {watchlist &&
          watchlist.map((watch) => {
            return (
              <Col key={watch.id}>
                <Link
                  className="App-link"
                  to={`/playlists/${watch.playlist.id}/`}
                >
                  <Image src={watch.playlist.cover_url} />
                </Link>
                <p>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => handleClickRemoveWatchItem(watch.id)}
                  >
                    Remove from Watchlist
                  </Button>
                </p>
              </Col>
            );
          })}
        {watchlist.length === 0 ? (
          <Link to="/">
            Nothing here... maybe try adding something to your list?
          </Link>
        ) : (
          <Link to="/">Back to home</Link>
        )}
      </Row>
    </Container>
  );
};

export default WatchlistPage;
