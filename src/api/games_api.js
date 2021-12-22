import axios from "axios";
// client id a
// Have to get a "Bearer" token from my backend

const getAccessToken = async () => {
  const res = await fetch("http://localhost:8000/api/current_access_token/");
  const data = await res.json();
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("client_id", data.client_id);
};

const getGameDBData = async (slug) => {
  if (!localStorage.getItem("access_token")) {
    await getAccessToken();
  }

  const res = await fetch(
    "https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": localStorage.getItem("client_id"),
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: `fields *; where slug="${slug}";`,
    }
  );
  const data = await res.json();
  return data[0];
};



export { getGameDBData };
