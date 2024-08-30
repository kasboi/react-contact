import { useEffect, useState } from "react"
import style from "./App.module.css"
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"

const App = () => {
    const [contacts, setContacts] = useState([])
    /* On the page's first render, it checks the local storage for contacts */
    useEffect(() => {
        const data = localStorage.getItem("contacts")
        if (data) {
            const contacts = JSON.parse(data)
            setContacts(contacts)
        }
    }, [])

    return (
        <div className={style.container}>
            <Sidebar contacts={contacts} setContacts={setContacts} />
            <div className={style.details}>
                <Outlet context={[contacts, setContacts]} />
            </div>
        </div>
    )
}

export default App
