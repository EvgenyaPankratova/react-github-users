import styles from "./Pagination.module.css";

const Pagination = ({usersPerPage, totalUsers, paginate}) => {
  const pageUsers=[];

  for(let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++){
    pageUsers.push(i)
  }

    return <div className={styles.pages}>
        <ul className={styles.pages_list}>
        {pageUsers.map((elem, index) => {
          return (
            <>
              <li key={elem}>
                <a
                  onClick={(e) => paginate(e, elem, index)}
                  href="!#"
                >
                  {elem}
                </a>
              </li>
            </>
          );
        })}
      </ul>
    </div>
}

export default Pagination;