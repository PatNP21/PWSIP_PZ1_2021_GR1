import { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import classes from "./PostItem.module.css";
import PostHandler from "./../PostHandler";
import Cookies from "universal-cookie";
import Card from "./../UI/Card";

const postHandler = new PostHandler();

function PostItem(props) {
  const cookies = new Cookies();
  const c = cookies.get("sessionId");
  const [comment, setComment] = useState("");
  const [likeControl, setLikeControl] = useState(false);

  const createComment = () => {
    postHandler.createComment(c, props.id, comment).then((data) => {
      console.log(data);
    });
  };

  const likeIt = () => {
    postHandler.likePost(c, props.id).then((data) => {
      console.log(data);
      setLikeControl(true);
    });
  };

  return (
    
<<<<<<< HEAD
    <div className={classes.onePostCard}>
      <Card>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
=======
      <div className={classes.onePostCard}>
        <div className={classes.postContent}>
          
            <div className={classes.content}>
              <h3>{props.title}</h3>
              <address>{props.address}</address>
              <p>{props.description}</p>
            </div>
            <div className={classes.image}>
              <img src={props.image} alt={props.title} />
            </div>
          
>>>>>>> 54a5500d9e3c9784ba75ba62582b426f2ea6edb5
        </div>
      
        
          <div className={classes.activityContent}>
          
            <div className={classes.likeIt}>
              <i>
                <AiFillLike onClick={likeIt} />
              </i>
              <p>To jest OK!</p>
            </div>
            <div className={classes.likesCount}></div>
            <div className={classes.writeComment}>
              <input
                type="text"
                placeholder="Write a comment"
                onChange={(e) => setComment(e.target.value)}
              />
              <button onClick={createComment}>Submit</button>
            </div>

            <div className={classes.comments}>
              <ul>
                {props.comments !== null && props.comments !== undefined ? (
                  props.comments.map((item) => {
                    return (
                      <li>
                        <Card>
                          <h4>{item.author}</h4>
                          <p>{item.content}</p>
                        </Card>
                      </li>
                    );
                  })
                ) : (
                  <p>Nie znaleziono komentarzy</p>
                )}
              </ul>
            </div>
          </div>

          <div className={classes.actions}>
            <button>To Favourites</button>
          </div>
        
      </div>
    
  );
}

export default PostItem;
