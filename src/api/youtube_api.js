/*

fetch(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=PL7RtZMiaOk8hTL5aWW1xVhHoiAbhqFtkO&key=AIzaSyBRTkt7dr_M_HwZhMpmV4CdujEtQPd-96o`)

*/

const getYTPlayList = async (playlistId) => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&key=AIzaSyBRTkt7dr_M_HwZhMpmV4CdujEtQPd-96o&maxResults=5&part=snippet`
  );
  const data = await res.json();
  return data;
};

const getYTPlayListNextPage = async (playlistId, pageToken) => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&key=AIzaSyBRTkt7dr_M_HwZhMpmV4CdujEtQPd-96o&maxResults=5&pageToken=${pageToken}&part=snippet`
  );
  const data = await res.json();
  return data;
};

export { getYTPlayList, getYTPlayListNextPage };
