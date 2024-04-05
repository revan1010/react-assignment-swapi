import React, { useEffect, useState } from "react";
import "./Card.css";
import CardModal from "../modal/CardModal";
import { motion } from "framer-motion";

const Card = ({ data }) => {
  const [speciesInfo, setSpeciesInfo] = useState(null);
  const [colorr, setColor] = useState(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const speciesResponse = await Promise.all(
          data.species.map((url) =>
            fetch(url).then((response) => response.json())
          )
        );
        setSpeciesInfo(speciesResponse);
        console.log(speciesResponse);
      } catch (error) {
        console.error("Error fetching species:", error);
      }
    };

    if (data.species && data.species.length > 0) {
      fetchSpecies();
    }
  }, [data]);

  useEffect(() => {
    if (speciesInfo !== null && speciesInfo.length > 0) {
      const speciesName = speciesInfo[0].name;
      setColor(getSpeciesColor(speciesName));
    }
  }, [speciesInfo]);
  const getSpeciesColor = (speciesName) => {
    switch (speciesName) {
      case "Human":
        return "#f1c27d";
      case "Droid":
        return "#99830a";
      case "Wookie":
        return "#595858";
      case "Rodian":
        return "#1f7b0b";
      case "Hutt":
        return "#003d0e";
      case "Yoda's species":
        return "#27fa4e";
      case "Trandoshan":
        return "#9fa40a";
      case "Mon Calamari":
        return "#ff7a00";
      case "Ewok":
        return "#6f6666";
      case "Sullustan":
        return "#d2b9b9";
      case "Neimodian":
        return "#074417";
      case "Gungan":
        return "#576e49";
      case "Toydarian":
        return "#5aaf92";
      case "Dug":
        return "#a05a78";
      case "Twi'lek":
        return "#386898";
      case "Aleena":
        return "#5c5e95";
      case "Vulptereen":
        return "#339470";
      case "Xexto":
        return "#ff6e00";
      case "Toong":
        return "#03bc5b";
      case "Cerean":
        return "#b16868";
      case "Nautolan":
        return "#55c513";
      case "Zabrak":
        return "#d96700";
      case "Tholothian":
        return "#ffad34";
      case "Iktotchi":
        return "#ff5e00";
      case "Quermian":
        return "#e2e2e2";
      case "Kel Dor":
        return "#fdcc3b";
      case "Chagrian":
        return "#0074d9";
      case "Geonosian":
        return "#ff851b";
      case "Mirialan":
        return "#008000";
      case "Clawdite":
        return "#008080";
      case "Besalisk":
        return "#8B4513";
      case "Kaminoan":
        return "#808080";
      case "Skakoan":
        return "#32CD32";
      case "Muun":
        return "#d3d3d3";
      case "Togruta":
        return "#FF0000";
      case "Kaleesh":
        return "#D2691E";
      case "Pau'an":
        return "#A9A9A9";
      default:
        return "#fffff";
    }
  };
  return (
    <div className="cardWrapper">
      <motion.div
        className="card"
        style={{ backgroundColor: colorr ? colorr : "#e0ac69" }}
        onClick={() => setOpen(true)}
      >
        <div className="cardImg">
          <img src="https://picsum.photos/250/250" alt="imgg" />
        </div>
        <div className="cardName"> {data.name}</div>
      </motion.div>
      <CardModal open={open} setOpen={setOpen} data={data} />
    </div>
  );
};

export default Card;
