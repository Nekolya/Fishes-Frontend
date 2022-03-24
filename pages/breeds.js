import React, { useState, useEffect } from "react";
import { useLayoutEffect } from "react";
import Card from "../components/card/card";
import instance from "../lib/instance";
import styles from "../styles/breed.module.css";

const Breeds = () => {
  const [breeds, setBreeds] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    if (breeds) {
      if (sort == 1)
        breeds.sort((a, b) => {
          if (a.name > b.name) return 1;
          return -1;
        });
      else if (sort == 0)
        breeds.sort((a, b) => {
          if (a.id > b.id) return 1;
          return -1;
        });
      setSort(null);
    }
  }, [sort]);

  const post = () => {
    instance
      .post("/breeds", JSON.stringify({ id: parseInt(id), name: name}))
      .then((request) => setBreeds(breeds.concat(request.data)))
      .catch((request) => console.log(request.status));
  };

  const del = (id) => {
    instance
      .delete("/breeds/" + id)
      .then((request) => {
        setBreeds(breeds.filter(item =>item.id != id ), 1);
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
      <div className={styles.sort}>
        <h3>Сортировать по</h3>
        <button onClick={() => setSort(0)}>Id</button>
        <button onClick={() => setSort(1)}>Названию</button>
      </div>
      <div className={styles.card}>
        <div>
          <label>Id</label>
          <input
            value={id ? id : ""}
            onChange={(event) => setId(event.target.value)}
          ></input>
        </div>
        <div>
          <label>Название</label>
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
