import { useState } from "react";
import styles from "./User.module.css";

const User = ({ usersCopy, handleToggle}) => {

  const showAbout = (elem) => {
    handleToggle(elem);
  }

  return (
    <div className={styles.users}>
      {usersCopy
        .map((elem) => {
          return (<div className={styles.users_block}>
            <div className={styles.user_img_block}>
                <img className={styles.user_img} src={elem.avatar_url} alt={elem.id} />
            </div>
            <div>
            <ul className={styles.users_list}>
              <li className={styles.users_list_item}>
                <span>id:</span>{elem.id} <span>login: </span>{elem.login} 
              </li>
            </ul>
            </div>
            <div className={styles.users_about}><button style={elem.isActive ? {border: "1px solid black"} : {border: "none"}}  onClick = {() => showAbout(elem)}>Подробнее...</button>
            {elem.isActive && <p><span>repositories: </span>{elem.repos_url} </p>}</div>
            </div>);
        })}
    </div>
  );
};

export default User;
