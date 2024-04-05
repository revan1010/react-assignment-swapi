import React, { useState, useEffect } from "react";
import "./CardModal.css";
const CardModal = ({ data, open, setOpen }) => {
  const [homeworldInfo, setHomeworldInfo] = useState(null);

  useEffect(() => {
    const fetchHomeworldInfo = async () => {
      try {
        const response = await fetch(data.homeworld);
        const homeworldData = await response.json();
        setHomeworldInfo(homeworldData);
        console.log(homeworldData);
      } catch (error) {
        console.error("Error fetching homeworld data:", error);
      }
    };

    if (data.homeworld) {
      fetchHomeworldInfo();
    }
  }, [data.homeworld]);
  const handleCloseModal = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  const heightInMeters = data.height / 100;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month < 10 ? "0" + month : month}-${year}`;
  };

  return open ? (
    <div onClick={handleCloseModal} className="overlay">
      <div className="modalContainer" onClick={handleModalClick}>
        <div className="head-part">
          {" "}
          <h2>{data.name} </h2>
        </div>
        <div className="height-mass">
          <p>
            Height: <b> {heightInMeters}</b> m
          </p>
          <p>
            Mass: <b> {data.mass}</b> kg
          </p>
          <p>
            Created at: <b> {formatDate(data.created)}</b>
          </p>

          <p>
            Number of Films: <b> {data.films.length}</b>
          </p>
          <p>
            Birth Year: <b> {data.birth_year}</b>
          </p>
        </div>
        {homeworldInfo && (
          <div className="homeland">
            <div className="head-homeland">
              {" "}
              <h4>Home World Details:</h4>
            </div>
            <div className="home-details">
              <p>
                Name: <b> {homeworldInfo.name}</b>
              </p>
              <p>
                Terrain: <b> {homeworldInfo.terrain}</b>
              </p>
              <p>
                Climate: <b> {homeworldInfo.climate}</b>
              </p>
              <p>
                Residents: <b> {homeworldInfo.residents.length}</b>
              </p>
            </div>
          </div>
        )}
        <div className="button-part">
          <button onClick={handleCloseModal}> Close X</button>
        </div>
      </div>
    </div>
  ) : null;
};

export default CardModal;
