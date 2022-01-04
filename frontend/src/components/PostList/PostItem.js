import classes from "./PostItem.module.css";

function PostItem(props) {
  return (
    <li>
      <div className={classes.image}>
        <img src={props.image} alt={props.title} />
      </div>
      <div className={classes.content}>
        <h3>{props.title}</h3>
        <address>{props.address}</address>
        <p>{props.descryption}</p>
      </div>
      <div className={classes.actions}>
        <button>To Favourites</button>
      </div>
    </li>
  );
}

export default PostItem;
