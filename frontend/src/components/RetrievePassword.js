import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import RegisterHandler from './RegisterHandler'
import './RetrievePassword.css'

const registerHandler = new RegisterHandler()
function RetrievePassword() {

    const [usedEmail, setUsedEmail] = useState()
    const [slogan, setSlogan] = useState(" ")

    const resetPasswordOperation = () => {
        try {
            registerHandler.passwordRecoverySend(usedEmail).then((res) => {
                let status = res.data.success
                if (status)
                {
                    //console.log("Daj info na ekranie o tym ze masz link na mailu")
                    setSlogan("Sprawdź pocztę e-mail, wysłaliśmy Ci wiadomość z linkiem za pomocą którego odzyskasz hasło!")
                    
                }
                else
                {
                    console.log(res.data.errors)
                }
            })
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
           <h2>{slogan}</h2>
        </div>
    )
}

export default RetrievePassword
