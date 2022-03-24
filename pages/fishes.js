import React, { useState, useEffect } from "react";
import { useLayoutEffect } from "react";
import Card from "../components/fish_card/card";
import instance from "../lib/instance";
import styles from "../styles/fishes.module.css";

const Fishes = () => {
  const [fishes, setFishes] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [breed, setBreed] = useState(null);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    if (fishes) {
      if (sort == 1)
        fishes.sort((a, b) => {
          if (a.name > b.name) return 1;
          return -1;
        });
      else if (sort == 2)
        fishes.sort((a, b) => {
          if (a.breedId > b.breedId) return 1;
          return -1;
        });
      else if (sort == 0)
        fishes.sort((a, b) => {
          if (a.id > b.id) return 1;
          return -1;
        });
      setSort(null);
    }
  }, [sort]);

  const post = () => {
    instance
      .post("/fishes", JSON.stringify({ id: parseInt(id), name: name, breedId: parseInt(breed)}))
      .then((request) => setFishes(fishes.concat(request.data)))
      .catch((request) => console.log(request.status));
  };

  const del = (id) => {
    instance
      .delete("/fishes/" + id)
      .then((request) => {
        setFishes(fishes.filter(item =>item.id != id ), 1);
      })
      .catch((request) => console.log(request.status));

  };

  useEffect(() => {
    instance
      .get("/fishes")
      .then((request) => {
        setFishes(request.data);
      })
      .catch((request) => console.log(request.status));
  }, []);
  return (
    <div>
      <h1>Рыбки</h1>
      <div className={styles.sort}>
        <h3>Сортировать по</h3>
        <button onClick={() => setSort(0)}>Id</button>
        <button onClick={() => setSort(1)}>Имени </button>
        <button onClick={() => setSort(2)}>Id вида</button>
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
          <label>Имя</label>
          <input
            value={name ? name : ""}
            onChange={(event) => setName(event.target.value)}
          ></input>
        </div>
        <div>
          <label>Вид</label>
          <input
            value={breed ? breed : ""}
            onChange={(event) => setBreed(event.target.value)}
          ></input>
        </div>
        <button onClick={post}>Добавить новую рыбку</button>
      </div>
      <div>
        {fishes &&
          fishes.map((el) => {
            return <Card fish={el} del={del} key={el.id} />;
          })}
      </div>
    </div>
  );
};

export default Fishes;
