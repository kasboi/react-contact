import style from "./Sidebar.module.css"
import { Link } from "react-router-dom"

const Sidebar = ({ contacts, setContacts }) => {
    const handleClear = () => {
        const response = confirm("This action cannot be reversed!")
        if (response) {
            localStorage.removeItem("contacts")
            setContacts([])
        }
    }
    return (
        <nav className={style.sidebar}>
            <div className={style.sidebar_inputs}>
                <button>
                    <Link to={"/"}>New Contact</Link>
                </button>
                <input type="text" id="search" placeholder="Search..." />
            </div>
            {contacts && (
                <div className={style.contact_list}>
                    {contacts.map((contact) => (
                        <Link to={`/contact/${contact.contactId}`} className={style.contact_item} key={contact.contactId}>
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
