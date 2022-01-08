import { useState } from 'react'
import { AiFillLike } from 'react-icons/ai'
import classes from "./PostItem.module.css";
import PostHandler from './../PostHandler'
import Cookies from 'universal-cookie'

const postHandler = new PostHandler()

function PostItem(props) {

  const cookies = new Cookies()
  const c = cookies.get("sessionId")
  const [comment, setComment] = useState('')

  const createComment = () => {
    postHandler.createComment(c, props.id, comment).then((data) => {
      console.log(data)
    })
  }

  return (
      <div className={classes.onePostCard}> 
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.activityContent}>
          <div className={classes.likeIt}>
            <i><AiFillLike/></i>
            <p>To jest OK!</p>
          </div>
          <div className={classes.likesCount}>
          </div>
          <div className={classes.writeComment}>
            <input type="text" placeholder="Write a comment" onChange={e => setComment(e.target.value)}/>
            <button onClick={createComment}>Submit</button>
          </div>
          <div className={classes.comments}>
            <ul></ul>
          </div>
        </div>
        <div className={classes.actions}>
          <button>To Favourites</button>
        </div>
      </div>
  )
}

export default PostItem
