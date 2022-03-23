import styles from "./navbar.module.css";
import React, { useState, useEffect } from "react";
import logo from "../../images/aquarium-svgrepo-com.svg";
import Image from "next/image";
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image
          src={logo}
          alt="Show"
          layout="fixed"
          width="70px"
          height="70px"
        />
        <p>
          Здесь живут <br /> РЫБКИ
        </p>
      </div>
      <div className={styles.pages}>
        <Link href="/fishes"><a>Рыбки</a></Link>
        <Link href="/breeds"><a>Виды рыбок</a></Link>

      </div>
    </nav>
  );
};

export default Navbar;
