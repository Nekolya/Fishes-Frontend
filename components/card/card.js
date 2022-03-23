import React, { useState, useEffect } from "react";
import styles from "./card.module.css";

const Card = ({ breed, del, setEditId, editId }) => {
  const [edit, setEdit] = useState(null);
  const [name, setName] = useState(breed.name);

  const editEl = () => {
    setEdit(false);
    instance
      .put("/breeds", JSON.stringify({ id: parseInt(breed.id), name: name }))
      .catch((request) => console.log(request.status));
    instance
      .get("/breeds")
      .then((request) => {
        setBreeds(request.data);
      })
      .catch((request) => console.log(request.status));
  };

  return (
    <div className={styles.card}>
      <div>{breed.id}</div>
      {!edit ? (
        <div>{name}</div>
      ) : (
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
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

        <button className={styles.delete} onClick={() => del(breed.id)}>
          Удалить
        </button>
      </div>
    </div>
  );
};

export default Card;
