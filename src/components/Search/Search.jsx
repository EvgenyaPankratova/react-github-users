
import styles from "./Search.module.css";

const Search = ({searchValue, onChangeSearchValue}) => {
    return <div className={styles.search}>
            <input
            className={styles.search_input}  
              value={searchValue}
              onChange={onChangeSearchValue}
              type="search"
              placeholder="Найти пользователя по логину..."
            />
    </div>
}

export default Search;