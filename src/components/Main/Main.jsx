import styles from "./Main.module.css";
import Search  from "../Search/Search";
import Pagination  from "../Pagination/Pagination";
import Skeleton  from "../Skeleton/Skeleton";
import User  from "../User/User";
import { useEffect, useState } from "react";


const Main = () => {
    const [searchValue, setsearchValue] = useState(""); //для поиска
    const [users, setUsers] = useState([]); //храним пользователей
    const [isLoading, setLoading] = useState(true); //для загрузки
    const [name, setName] = useState('Evgenya'); //для отображения пользователей по имени
    const [currentPage, setCurrentPage] = useState(1); //для текущей страницы
    const [usersPerPage] = useState(8); //храним кол-во элементов, которые нужно показать на каждой странице
    const [order, setOrder] = useState("ASC"); //для сортировки

 

    const onChangeSearchValue = (event) => {
        if(event.target.value){
          setsearchValue(event.target.value);
          setName(event.target.value);
        }else{
          setsearchValue('Evgenya');
          setName('Evgenya');
        }
      };

      useEffect(() => {
        fetch(`https://api.github.com/search/users?q=${name}`)
          .then((res) => res.json())
          .then((json) => {
            setUsers(json.items);

          })
          .catch((err) => {
            console.warn(err);
            alert("oh, something went wrong");
          })
          .finally(() => setLoading(false));
      }, [name]);

      
    
      const lastUserIndex = currentPage * usersPerPage;
      const firstUserIndex = lastUserIndex - usersPerPage;
      const currentUsers = users ? users.slice(firstUserIndex, lastUserIndex) : [];

    
      const paginate = (e, pageNumber, index) => {
        e.preventDefault();
        setCurrentPage(pageNumber);
      
      };

    



  const [usersCopy, setusersCopy] = useState([]);
 
  const handleToggleClick = (elem) => {
    setusersCopy((prev) => prev.map(item => {
        return elem.indId === item.indId ? {...item, isActive : !item.isActive} : item //создали новый объект, скопировав старые сво-ва и поменяли isActive
    }))
  }

  let usersFiltered = currentUsers
  .filter((obj) => {
  let fullLogin = obj.login.toLowerCase();
  return fullLogin.includes(searchValue.toLowerCase());
})
  .map((obj, index) => ({ ...obj, indId: index + 1, isActive: false }));

  useEffect(() => {
    setusersCopy(usersFiltered);
  }, [usersFiltered]);

      const Sorting = (col) => {
        if (order === "ASC") {
          const sorted = [...users].sort((a, b) => (a[col] > b[col] ? 1 : -1));
          setUsers(sorted);
          setOrder("DSC");
        }
        if (order === "DSC") {
          const sorted = [...users].sort((a, b) => (a[col] < b[col] ? 1 : -1));
          setUsers(sorted);
          setOrder("ASC");
        }
      };

     
    

    return <main>
        <Search searchValue={searchValue} onChangeSearchValue={onChangeSearchValue}/>

        <div><div className={styles.main_subtitle} onClick={() => Sorting("id")}>Список пользователей GitHub <span>{order === "DSC" ? `▼` : `▲`} </span></div>
            {isLoading ? (
            <div className="skeleton">
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          ) : (
            <User
              usersCopy={usersCopy}
              handleToggle={handleToggleClick}
            />
          )}
        
        </div>

        <Pagination usersPerPage={usersPerPage} totalUsers={users.length} paginate={paginate}/>
    </main>
}

export default Main;