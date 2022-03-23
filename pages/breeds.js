import React, { useState, useEffect } from "react";
import Card from "../components/card/card";
import instance from "../lib/instance";
import styles from "../styles/breed.module.css";

const Breeds = () => {
  const [breeds, setBreeds] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);


  const post = () => {
    instance
      .post("/breeds", JSON.stringify({ id: parseInt(id), name: name }))
      .catch((request) => console.log(request.status));
    instance
      .get("/breeds")
      .then((request) => {
        setBreeds(request.data);
      })
      .catch((request) => console.log(request.status));
  };

  const del = (id) => {
    instance
      .post("/breeds", JSON.stringify({ id: parseInt(id), name: name }))
      .catch((request) => console.log(request.status));
    instance
      .get("/breeds")
      .then((request) => {
        setBreeds(request.data);
      })
      .catch((request) => console.log(request.status));
  };


  useEffect(() => {
    instance
      .get("/breeds")
      .then((request) => {
        setBreeds(request.data);
      })
      .catch((request) => console.log(request.status));
  }, []);
  return (
    <div>
      <h1>Виды рыбок</h1>
      <div className={styles.card}>
        <div>
          <label>Id</label>
          <input
            value={id ? id : ""}
            onChange={(event) => setId(event.target.value)}
          ></input>
        </div>
        <div>
          <label>Name</label>
          <input
            value={name ? name : ""}
            onChange={(event) => setName(event.target.value)}
          ></input>
        </div>
        <button onClick={post}>Добавить новый вид</button>
      </div>
      <div>
        {breeds &&
          breeds.map((el) => {
            return <Card breed={el} del={del} key={el.id} />;
          })}
      </div>
    </div>
  );
};

export default Breeds;
