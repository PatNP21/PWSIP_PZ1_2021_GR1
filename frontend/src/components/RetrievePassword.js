import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './RetrievePassword.css'

function RetrievePassword() {

    const [usedEmail, setUsedEmail] = useState()

    const resetPasswordOperation = () => {
        try {
            return axios.post('http://localhost:8000/register/recoverPassword/', {
                email: usedEmail
            }).then(() => console.log('Passowrd to reset'))
            .catch(err => console.log(`Error: ${err}`))
        } catch(err) {
            console.log(err)
        }
        
    }

    return (
        <div className="retrievePlot">
            <h3 className="sentenceRetrieve">Podaj adres e-mail, aby zresetować hasło</h3>
           <input className="retInput" type="text" placeholder="Enter E-mail address" onChange={e => setUsedEmail(e.target.value)}/><br/>
           <button className="inputRetSub" onClick={resetPasswordOperation}>Odzyskaj hasło</button>
        </div>
    )
}

export default RetrievePassword
