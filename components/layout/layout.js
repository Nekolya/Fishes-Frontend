import Navbar from "../navbar/navbar";
// import Footer from '../footer/footer'
import styles from "./layout.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  const [path, setPath] = useState(false);

  useEffect(() => {
    setPath(router.pathname.includes("login"));
  }, [router.pathname]);
  return (
    <div className={styles.container}>
      {path ? (
        <div className={styles.main_container}>{children}</div>
      ) : (
        <div className={styles.main_container}>
          <Navbar /> 
          <div className={styles.content_container}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
