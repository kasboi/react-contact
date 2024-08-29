import { useEffect, useState } from "react"
import style from "./App.module.css"
import Sidebar from "./Sidebar"
import Contact from "./Contact"
import Create from "./Create"
import { Outlet } from "react-router-dom"

const initData = [
    { firstName: "Jason", lastName: "Statham", mobile: "0812345678", email: "jason@statham.com" },
    { firstName: "Arnold", lastName: "Schwarznigger", mobile: "0812345678", email: "jason@statham.com" },
    { firstName: "Tom", lastName: "Cruise", mobile: "0812345678", email: "jason@statham.com" },
    { firstName: "Keanu", lastName: "Reeves", mobile: "0812345678", email: "jason@statham.com" },
    { firstName: "Channing", lastName: "Tatum", mobile: "0812345678", email: "jason@statham.com" },
]

const App = () => {
    const [contacts, setContacts] = useState([])

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
