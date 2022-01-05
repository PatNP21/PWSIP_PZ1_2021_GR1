import { useEffect, useState } from 'react'
import PostItem from "./PostItem";
import classes from "./PostList.module.css";
import PostHandler from './../PostHandler'
import Cookies from 'universal-cookie'
import ReactDOM from 'react-dom'
import Draw_it from './../../Draw_it.png'

const postHandler = new PostHandler()

function Postlist(props) {

  let postArray = []

  const cookies = new Cookies()
  const c = cookies.get("sessionId")

  useEffect(() => {
    console.log(c)
    postHandler.getselfPosts(c).then(
      data => {
        console.log(data)
        console.log(data.data.posts)
        for (let i=0; i<data.data.posts.length; i++) {
          postArray.push({
            title: data.data.posts[i].title,
            author: data.data.posts[i].author,
            content: data.data.posts[i].content
          })
        }
        //console.log(postArray)
      }
    )
<<<<<<< HEAD
  }, [])

  const laduj = () => {
    console.log(postArray)
  }
=======
  },[])
>>>>>>> 4050e00a76af63896bb61a0512c731d126373d63

  return (
    <ul className={classes.list} onLoad={laduj}>
    </ul>
  );
}
export default Postlist;
