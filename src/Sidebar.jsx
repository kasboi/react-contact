import style from "./Sidebar.module.css"
import { useNavigate, Link } from "react-router-dom"
import { matchSorter } from "match-sorter"
import { useEffect, useState } from "react"

const Sidebar = ({ contacts, setContacts }) => {
    const [sidebarContacts, setSidebarContacts] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        setSidebarContacts(contacts)
    }, [contacts])

    const handleClear = () => {
        const response = confirm("This action cannot be reversed!")
        if (response) {
            localStorage.removeItem("contacts")
            setContacts([])
        }
    }

    const handleSearch = (value) => {
        if (contacts) {
            setSidebarContacts(matchSorter(contacts, value, { keys: ["firstName", "lastName"] }))
        }
    }
    return (
        <nav className={style.sidebar}>
            <div className={style.sidebar_inputs}>
                <button onClick={() => navigate("/")}>New Contact</button>
                <input
                    type="text"
                    id="search"
                    placeholder="Search..."
                    onChange={(e) => handleSearch(e.target.value)}
                    autoComplete="off"
                />
            </div>
            {sidebarContacts && (
                <div className={style.contact_list}>
                    {sidebarContacts.map((contact) => (
                        <Link
                            to={`/contact/${contact.contactId}`}
                            className={style.contact_item}
                            key={contact.contactId}
                        >
                            {contact.firstName} {contact.lastName}
                        </Link>
                    ))}
                </div>
            )}
            <button className={style.deleteBtn} onClick={handleClear}>
                Clear Contacts
            </button>
        </nav>
    )
}

export default Sidebar
