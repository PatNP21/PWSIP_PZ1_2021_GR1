import { useEffect, useState } from 'react'
import PostItem from "./PostItem";
import classes from "./PostList.module.css";
import PostHandler from './../PostHandler'
import Cookies from 'universal-cookie'
import ReactDOM from 'react-dom'
import Draw_it from './../../Draw_it.png'
import Card from './../UI/Card'

const postHandler = new PostHandler()

function Postlist(props) {

  return (
    <ul className={classes.list}>
      {props.data.map(item => {
        return (
            <li>
              <Card>
                <PostItem image={Draw_it} title={item.title} address={item.author} description={item.content}/>
              </Card>
            </li>)
      })}
      
    </ul>
  )
}
export default Postlist;
