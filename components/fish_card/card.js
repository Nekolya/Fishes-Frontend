import React, { useState, useEffect } from "react";
import styles from "./card.module.css";
import instance from "../../lib/instance";

const Card = ({ fish, del}) => {
  const [edit, setEdit] = useState(null);
  const [name, setName] = useState(fish.name);
  const [breed, setBreed] = useState(fish.breedId);

  const editEl = () => {
    setEdit(false);
    instance
      .put("/fishes/" + fish.id, JSON.stringify({ id: parseInt(fish.id), name: name, breedId: parseInt(breed) }))
      .catch((request) => console.log(request.status));

  };

  return (
    <div className={styles.card}>
      <div>{fish.id}</div>
      {!edit ? (
        <div>{name}</div>
      ) : (
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
        ></input>
      )}
      {!edit ? (
        <div>{breed}</div>
      ) : (
        <input
          value={breed}
          onChange={(event) => setBreed(event.target.value)}
        ></input>
      )}
      <div className={styles.buttons}>
        {!edit ? (
          <button className={styles.edit} onClick={() => setEdit(true)}>
            Редактировать
          </button>
        ) : (
          <button className={styles.edit} onClick={editEl}>
            Сохранить
          </button>
        )}

        <button className={styles.delete} onClick={() => del(fish.id)}>
          Удалить
        </button>
      </div>
    </div>
  );
};

export default Card;
