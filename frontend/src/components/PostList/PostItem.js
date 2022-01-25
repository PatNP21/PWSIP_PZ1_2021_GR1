import { useState ,useEffect} from "react"
import { AiFillLike } from "react-icons/ai"
import { RiDeleteBin7Line } from 'react-icons/ri'
import classes from "./PostItem.module.css"
import PostHandler from "./../PostHandler"
import Cookies from "universal-cookie"
import Comment from "./Comment"
import Card from "./../UI/Card"
import { useNavigate } from "react-router-dom"

const postHandler = new PostHandler();
function PostItem(props) {
  const cookies = new Cookies();
  const c = cookies.get("sessionId");
  const user = cookies.get("user");
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState(0)
  const [likeControl, setLikeControl] = useState(false);
  const navigate = useNavigate()
  const createComment = () => {
    postHandler.createComment(c, props.id, comment).then((data) => {
      console.log(data);
    });
  };

  const likeIt = () => {
    if (c) {
      postHandler.likePost(c, props.id).then((data) => {
        console.log(data);
        setLikeControl(!likeControl);
      });
    } else {
      navigate('/login')
    }
    
  };
  const deletePost = () => {
    postHandler.deletePost(c,props.id).then(window.location.reload(true))
  }
  const deleteComment = id => {
    postHandler.deleteComment(c,id).then(() => {
      console.log("????")
      window.location.reload(true)
    })
  }
  useEffect(() => {
    postHandler.getLikes(props.id).then((res) => {
      console.log("hmmm")
      if(res.data.success == true)
      {
        console.log("WORKS")
        setLikes(res.data.likecounter)
      }
    })
  },[likeControl])
  return(
    
    <div className={classes.onePostCard}>   
      
      <div className={classes.content}>
          <address>{props.address}</address>
          <p>{props.description}</p>
      </div>
      <div className={classes.trush}>
      {(user == props.address && c) && <RiDeleteBin7Line 
          className={classes.trushIcon}
          onClick={deletePost}
        />}
          
      </div> 
      <div className={classes.image}>
        <img src={props.image} alt={props.title} />       
      </div>

      <div className={classes.activityContent}>
        <div className={classes.likeIt}>
          <i>
            <AiFillLike onClick={likeIt} />
          </i>
        </div>
        <div className={classes.likesCount}>{likes}</div>
        {c && <div className={classes.writeComment}>
          <input
            type="text"
            placeholder="Write a comment"
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={createComment}>Submit</button>
        </div>}
        <div className={classes.clearBoth}></div>
      </div>

      <div className={classes.comments}>
        <ul>
          {props.comments !== null && props.comments !== undefined ? (
            props.comments.map((item) => {
              return (
                <li>
                  <Comment id = {item.id} author = {item.author} content = {item.content}/>
                </li>
              );
            })
          ) : (
            <p>Nie znaleziono komentarzy</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default PostItem;
