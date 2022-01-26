import { useEffect, useState } from 'react'
import PostItem from "./PostItem";
import classes from "./PostList.module.css";
import PostHandler from './../PostHandler'
import Cookies from 'universal-cookie'
import ReactDOM from 'react-dom'
import Draw_it from './../../Draw_it.png'
import Card from './../UI/Card'
import FriendName from '../UI/FriendName';

const postHandler = new PostHandler()

function Postlist(props) {

  return (
    <ul className={classes.list}>
      {props.data !== null ? props.data.map(item => {
        return (
            <li key={item.id} className={classes.post}>
              
                <PostItem 
                  image={item.image ? item.image : Draw_it} 
                  title={item.title} 
                  address={item.author} 
                  description={item.content} 
                  id={item.id} 
                  comments={item.comments} 
                  likecounter = {item.likecounter}
                />
              
            </li>)
      }): <p>Nic nie ma</p>}
      
    </ul>
  )
}
export default Postlist;