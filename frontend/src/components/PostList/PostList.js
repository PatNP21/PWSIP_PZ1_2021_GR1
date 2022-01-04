import PostItem from "./PostItem";
import classes from "./PostList.module.css";

function Postlist(props) {
  return (
    <ul className={classes.list}>
      {props.data.map((postdata) => (
        <li>
          <PostItem
            key={postdata.id}
            id={postdata.id}
            image={postdata.image}
            title={postdata.title}
            address={postdata.address}
            descryption={postdata.descryption}
          />
        </li>
      ))}
    </ul>
  );
}
export default Postlist;
