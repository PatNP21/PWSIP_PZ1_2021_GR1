import { useEffect } from 'react'
import classes from "./PostItem.module.css";

function PostItem(props) {

  useEffect(() => {
    console.log(props.description)
  })

  return (
      <div> 
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          <button>To Favourites</button>
        </div>
      </div>
  )
}

export default PostItem
