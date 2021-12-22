import { useEffect, useState } from "react";
import { Container, Row, Button, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import {
  getPlayList,
  getWatchListItems,
  addToWatchList,
  removeFromWatchList,
} from "../api/api";
import { getYTPlayList, getYTPlayListNextPage } from "../api/youtube_api";
import PlayListItem from "../components/PlayListItem";
import Reviews from "../components/Reviews";
import Player from "../components/Player";

const PlayListPage = () => {
  const [playlist, setPlaylist] = useState({});
  const [nextPage, setNextPage] = useState([]);
  const [playlistItems, setPlaylistItems] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [videoId, setVideoId] = useState(0);

  const { playlist_id } = useParams();

  useEffect(() => {
    const loadWatchlist = async () => {
      const data = await getWatchListItems();
      setWatchlist(data.filter((watch) => watch.playlist.id !== playlist_id));
    };

    loadWatchlist();
  }, []);

  useEffect(() => {
    const loadPlaylist = async () => {
      const data = await getPlayList(playlist_id);
      setPlaylist(data);
    };

    loadPlaylist();
  }, [playlist_id]);

  useEffect(() => {
    const loadYTData = async () => {
      const data = await getYTPlayList(playlist.youtube_url);
      setNextPage(data.nextPageToken);
      setPlaylistItems([...data.items]);
    };
    if (playlist.youtube_url !== undefined) {
      loadYTData();
    }
  }, [playlist]);

  const handleLoadMore = async () => {
    const data = await getYTPlayListNextPage(playlist.youtube_url, nextPage);
    setNextPage(data && data.nextPageToken);
    setPlaylistItems([...playlistItems, ...data.items]);
  };

  const isInWatchlist = (playlist_id) => {
    return watchlist
      .map((watch) => (watch && watch.playlist.id) || false)
      .includes(playlist_id);
  };

  const handleClickAddWatchItem = async (id) => {
    const watch = await addToWatchList(id);
    setWatchlist([...watchlist, watch]);
  };

  const handleClickRemoveWatchItem = async (id) => {
    removeFromWatchList(id);
    setWatchlist(watchlist.filter((watch) => watch.id !== id));
  };

  return (
    <Container>
      <Row>
        <Col sm={2}>
          <h4>{playlist.name}</h4>
          <p>
            A {playlist.content_type} playlist by {playlist.creator}
          </p>
          {!isInWatchlist(playlist.id) ? (
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => handleClickAddWatchItem(playlist.id)}
            >
              Add to Watchlist
            </Button>
          ) : (
            <div>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => handleClickRemoveWatchItem(watchlist[0].id)}
              >
                Remove from Watchlist
              </Button>
              <br></br>
              <Link to="/watchlist">View Watchlist</Link>
            </div>
          )}
        </Col>
        <Col className="mb-5">
          <Player
            height="390"
            width="640"
            idx={videoId}
            playlist={playlist.youtube_url}
          />
          {playlistItems.map((item, idx) => {
            return (
              <PlayListItem
                key={item.id}
                item={item}
                idx={idx}
                handleSetVideo={(id) => setVideoId(id)}
              />
            );
          })}
        </Col>
        <Button onClick={handleLoadMore}>Load More</Button>
      </Row>
      <Reviews playlist_id={playlist_id} />
    </Container>
  );
};

export default PlayListPage;
