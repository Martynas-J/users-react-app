import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { API_URL, categoriesArr } from "../../Components/Config/Config"
import { firstLetterUpperCase } from "../../Components/Functions/Functions"


const SearchPage = () => {

  const text = useParams().text
  const category = useParams().category


  const [data, setData] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      let prevData;
      if (category) {
        await axios.get(`${API_URL}/${category}?q=${text}`)
          .then(res => prevData = { [category]: res.data });
      } else {
        await Promise.all(
          categoriesArr.map(async item => {
            await axios.get(`${API_URL}/${item}?q=${text}`)
              .then(res => prevData = {
                [item]: res.data,
                ...prevData
              });
          })
        );
      }
      setData(prevData);
    };

    fetchData();
  }, [category, text]);

  if (!data) {
    return ""
  }
  let allSearch = ""
  allSearch = Object.entries(data).map((item, index) =>
    item[1].length > 0 ?
      <div key={index} className="search-item">
        <h1>Search by {item[0]} ({text})</h1>
        <ul>
          {item[1].map(element => {
            let searchResult = item[0] === "comments" || item[0] === "users" ? firstLetterUpperCase(element.name) : `Title: ${firstLetterUpperCase(element.title)}`
            let link = `../${firstLetterUpperCase(item[0])}Page/${element.id}`
            if (item[0] === "photos") {
              link = `../AlbumsPage/${element.id}`
            } else if (item[0] === "comments") {
              link = `../PostPage/${element.postId}`
            }
            return <Link key={element.id} to={link} ><li >{searchResult}</li></Link>
          })}
        </ul>
      </div>
      : ""
  )
  return (
    <div id="search">
      {allSearch.every(item => item === "") ? <h1>Nothing Found by ({text})</h1> : allSearch}
    </div>
  )
}

export default SearchPage