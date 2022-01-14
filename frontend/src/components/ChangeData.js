import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ChangeData.css'
import ProfileHandler from './ProfileHandler'
import Cookies from 'universal-cookie'

const profileHandler = new ProfileHandler()

export default function ChangeData(props) {

    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')
    const [newDateOfBirth, setNewDateOfBirth] = useState('')
    const navigate = useNavigate()
    const cookies = new Cookies()
    const c = cookies.get("sessionId")

    const changeProfileData = () => {
        profileHandler.changeprofile(c, props.email, newFirstName, newLastName, newDateOfBirth).then(
            (data) => {
                console.log(data)
                //navigate.goBack()
            }
        ).catch(err => console.error(err))
    }

    return (
        <div className="edit_profile">
            <input type="text" placeholder="Change first name" onChange={e => setNewFirstName(e.target.value)}/><br/>
            <input type="text" placeholder="Change last name" onChange={e => setNewLastName(e.target.value)}/><br/>
            <input type="date" placeholder="Change date of birth" onChange={e => setNewDateOfBirth(e.target.value)}/><br/>
            <button onClick={() => {
                changeProfileData()
                props.finishEditing()
            }}>Zapisz zmiany</button>
        </div>
    )
}
