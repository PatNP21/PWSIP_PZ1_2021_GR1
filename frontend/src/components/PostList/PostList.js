import PostItem from "./PostItem";
import classes from "./PostList.module.css";

function Postlist(props) {
  return (
    <ul className={classes.list}>
      {props.data.map((postdata) => (
        <PostItem
          key={postdata.id}
          id={postdata.id}
          image={postdata.image}
          title={postdata.title}
          address={postdata.address}
          descryption={postdata.descryption}
        />
      ))}
    </ul>
  );
}
export default Postlist;
