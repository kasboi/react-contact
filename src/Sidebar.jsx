import style from "./Sidebar.module.css"
import { useNavigate, Link } from "react-router-dom"
import { matchSorter } from "match-sorter"
import { useEffect, useState } from "react"

const Sidebar = ({ contacts, setContacts }) => {
    // This state is a seperate copy of the contacts state to be used to filter contacts based on search input
    const [sidebarContacts, setSidebarContacts] = useState()

    const navigate = useNavigate()

    // Whenever the global contacts state changes, we update in the sidebar and reset the input field
    useEffect(() => {
        document.getElementById("search").value = ""
        setSidebarContacts(contacts)
    }, [contacts])

    // Deleting all contacts
    const handleClear = () => {
        // Prompt the user to confirm their decision - response returns true/false
        const response = confirm("This action cannot be reversed!")
        // If the response is true, proceed to remove the contacts from localStorage, reset the global contacts state and redirect to home
        if (response) {
            localStorage.removeItem("contacts")
            setContacts([])
            navigate("/")
        }
    }

    // Function handling the filtering of contacts based on names or phone number
    const handleSearch = (value) => {
        if (contacts) {
            setSidebarContacts(
                matchSorter(contacts, value, {
                    keys: ["firstName", "lastName", "phoneNumber"],
                })
            )
        }
    }
    return (
        <nav className={style.sidebar}>
            <div className={style.sidebar_inputs}>
                <button onClick={() => navigate("/")}>New Contact</button>
                <input
                    type="text"
                    id="search"
                    placeholder="Search via names or phone number"
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
