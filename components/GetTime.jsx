export default function GetTime(track) {
  for (let pldata = 0; pldata < track.length; pldata++) {
    const item = track[pldata];
    const created = new Date(1e3 * item.created);
    let trackTime =
      (created.getHours() > 9 ? created.getHours() : "0" + created.getHours()) +
      ":" +
      (created.getMinutes() > 9
        ? created.getMinutes()
        : "0" + created.getMinutes());
    item.created = trackTime;
  }
  //   console.log(track);
  return track;
}
