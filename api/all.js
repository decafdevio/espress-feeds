import { useState } from "react";

export const AllStations = (url, country, alias) => {
  const [data, setData] = useState([]);

  console.log(`url: ${url}, country: ${country}, alias: ${alias}`);
  fetch(url + country + alias)
    .then((res) => res.json())
    .then((json) => setData(json))
    .catch((error) => console.error(error));
  // .finally(dataParse());

  dataParse = () => {
    let stations = data.stations;
    console.log(json);
  };
  return { data };
};
