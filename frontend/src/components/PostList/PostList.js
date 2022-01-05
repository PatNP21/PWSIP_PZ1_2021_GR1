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

  useEffect(() => {
    //console.log(props.data[0].content)
  })

  //let postArray = []
  //const [arr, setArr] = useState([])
  //const cookies = new Cookies()
  //const c = cookies.get("sessionId")
  
  return (
    <ul className={classes.list}>
      {props.data.map(item => {
        return (
          <Card>
            <li key={Math.floor(Math.random()*2000)}>
              <PostItem image={Draw_it} title={item.title} address={item.author} description={item.content}/>
            </li>
          </Card>)
      })}
      
    </ul>
  )
}
export default Postlist;
