import { useState ,useEffect} from "react"
import { AiFillLike } from "react-icons/ai"
import { RiDeleteBin7Line } from 'react-icons/ri'
import classes from "./PostItem.module.css"
import PostHandler from "./../PostHandler"
import Cookies from "universal-cookie"
import Card from "./../UI/Card"

const postHandler = new PostHandler();
function Comment(props) {
  const cookies = new Cookies();
  const c = cookies.get("sessionId");
  const user = cookies.get("user");
  
  const deleteComment = () => {
    postHandler.deleteComment(c,props.id).then(() => {
      window.location.reload(true)
    })
  }
  return(
    <div className={classes.comment}>
    <h4>{props.author}</h4>
    <p>{props.content}</p>
    {user == props.author && 
        <RiDeleteBin7Line className={classes.trushIcon} 
        onClick={deleteComment}/>}
        </div>
  );
}

export default Comment;
