import { useEffect, useState } from "react";

const Player = (props) => {
  const [player, setPlayer] = useState("");
  const [playerReady, setPlayerReady] = useState(false)

  useEffect(() => {
    let isMounted = true;
    if (window.YT && isMounted) {
      const p = new window.YT.Player("player", {
        height: props.height,
        width: props.width,
        playerVars: {
          playsinline: 1,
        },
        events: {
          onReady: (e) => {
            setPlayerReady(true);
          }
        },
      });
      setPlayer(p);
      
    }
    return () => { isMounted = false };
  }, [window.YT]);

  useEffect(() => {
    try {
      if (playerReady && player.cuePlaylist && props.idx > -1 && props.playlist) {
        player.cuePlaylist({
          listType: "playlist",
          list: props.playlist,
          index: props.idx,
        });
      }
    } catch (e) {
      console.error("My error: ", e);
    }
  }, [props.playlist, props.idx, player, playerReady]);

  return (
    <div>
      <div id="player"></div>
    </div>
  );
};

export default Player;
