// Auth required
const addToWatchList = async (playlist_id) => {
  try {
    const item = {
      playlist_id,
    };
    const res = await fetch(`http://localhost:8000/api/watchlists/`, {
      ...makeFetchInitPostAuthed(item),
    });
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    const data = await res.json();

    return data;
  } catch (e) {
    doLogout();
  }
};

// Auth required
const removeFromWatchList = async (watchlist_id) => {
  try {
    const res = await fetch(
      `http://localhost:8000/api/watchlists/${watchlist_id}`,
      makeFetchInitDelete()
    );
    //const data = await res.status();
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    return res;
  } catch (e) {
    doLogout();
  }
};

// Auth required
const getWatchListItems = async () => {
  try {
    const res = await fetch(`http://localhost:8000/api/watchlists/`, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    });
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    const data = await res.json();

    return data;
  } catch (e) {
    //doLogout();
  }
};

const getGame = async (game_id) => {
  try {
    const res = await fetch(`http://localhost:8000/api/games/${game_id}/`);
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

const getGames = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/games");
    const data = await res.json();

    return data;
  } catch (e) {
    console.error(e);
  }
};

const getPlayListsForGame = async (game_id) => {
  try {
    const res = await fetch(
      `http://localhost:8000/api/games/${game_id}/playlists/`
    );
    const data = await res.json();

    return data;
  } catch (e) {
    console.error(e);
  }
};

const getPlayList = async (id) => {
  try {
    const res = await fetch(`http://localhost:8000/api/playlists/${id}/`);
    const data = await res.json();

    return data;
  } catch (e) {
    console.error(e);
  }
};

const doLogin = async (username, password) => {
  try {
    const user = {
      username,
      password,
    };
    const res = await fetch(
      `http://localhost:8000/token-auth/`,
      makeFetchInitPost(user)
    );
    const data = await res.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("currentUser", data.user.username);
    return data;
  } catch (e) {
    return e;
  }
};

const isUserLoggedIn = () => {
  return (
    localStorage.getItem("currentUser") !== null &&
    localStorage.getItem("token") !== null
  );
};

const doRefresh = async () => {
  try {
    let token = window.localStorage.getItem("token");
    token = {
      token,
    };
    const res = await fetch(
      `http://localhost:8000/token-refresh/`,
      makeFetchInitPost(token)
    );
    const data = await res.json();

    localStorage.setItem("token", data.token);
    return data;
  } catch (e) {
    console.error(e);
  }
};

const doLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
};

const doSignup = async (userObject) => {
  const res = fetch("http://localhost:8000/api/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  });
  const data = await res.status;
  return data;
};

// Auth required
const postReview = async (reviewObj) => {
  try {
    // reviewObj = {
    //   rating: 5,
    //   review_text: "hello, review",
    //   playlist_id: 1,
    // };
    const res = await fetch(`http://localhost:8000/api/reviews/`, {
      ...makeFetchInitPostAuthed(reviewObj),
    });
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    const data = await res.json();

    return data;
  } catch (e) {
    doLogout();
  }
};

// Auth required
const deleteReview = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:8000/api/reviews/${id}`,
      makeFetchInitDelete()
    );
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    return res;
  } catch (e) {
    doLogout();
  }
};

const updateReview = async (reviewObj) => {
  try {
    const res = await fetch(
      `http://localhost:8000/api/reviews/${reviewObj.id}/`,
      makeFetchInitPatch(reviewObj)
    );
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    const data = await res.json();

    return data;
  } catch (e) {
    console.error("error from update: ", e);
  }
};

const makeFetchInitPost = (obj) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };
};

const makeFetchInitPatch = (obj) => {
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(obj),
  };
};

const makeFetchInitPostAuthed = (obj) => {
  const init = makeFetchInitPost(obj);
  init.headers.Authorization = `JWT ${localStorage.getItem("token")}`;
  return init;
};

const makeFetchInitDelete = () => {
  return {
    method: "DELETE",
    headers: {
      Authorization: `JWT ${localStorage.getItem("token")}`,
    },
  };
};

export {
  addToWatchList,
  getWatchListItems,
  removeFromWatchList,
  getGame,
  getGames,
  getPlayList,
  getPlayListsForGame,
  doLogin,
  doSignup,
  doLogout,
  isUserLoggedIn,
  doRefresh,
  postReview,
  deleteReview,
  updateReview,
};
