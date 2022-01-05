import { useEffect, useState } from 'react'
import PostItem from "./PostItem";
import classes from "./PostList.module.css";
import PostHandler from './../PostHandler'
import Cookies from 'universal-cookie'

const postHandler = new PostHandler()

function Postlist(props) {

  const [postArray, setPostArray] = useState([])

  const cookies = new Cookies()
  const c = cookies.get("sessionId")

  useEffect(() => {
    console.log(c)
    postHandler.getselfPosts(c).then(
      data => {
        console.log(data)
        console.log(data.posts)
        //setPostArray(data.posts)
      }
    )
  },[])

  return (
    <ul className={classes.list}>
      
    </ul>
  );
}
export default Postlist;
