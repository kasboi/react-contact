import { useEffect, useState } from "react"
import style from "./Contact.module.css"
import { useNavigate, useParams, useOutletContext } from "react-router-dom"

const Contact = () => {
    const { id } = useParams()
    // Global contacts state passed from App component
    const [contacts, setContacts] = useOutletContext()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [contact, setContact] = useState(null)

    const navigate = useNavigate()

    const handleDelete = (id) => {
        let contacts = localStorage.getItem("contacts")
        if (contacts) {
            // Get the contact to be deleted
            contacts = JSON.parse(contacts)
            const newContacts = contacts.filter(
                (contact) => contact.contactId !== id
            )
            setContacts(newContacts)
            localStorage.setItem("contacts", JSON.stringify(newContacts))

            // Redirect to home
            navigate("/")
        }
    }

    useEffect(() => {
        let contacts = localStorage.getItem("contacts")
        if (contacts) {
            contacts = JSON.parse(contacts)
            const userContact = contacts.find((item) => item.contactId === id)
            setLoading(false)
            setContact(userContact)
        } else {
            setLoading(false)
            setError(true)
        }
    }, [id])

    return (
        <>
            {loading && <h2>Loading...</h2>}
            {error && <h2>There was an error fetching that contact!</h2>}
            {contact && (
                <div className={style.contact_details}>
                    <h1 className={style.contact_details_name}>
                        {contact.firstName} {contact.lastName}
                    </h1>
                    <p className={style.contact_details_email}>
                        <span>📧</span>:{" "}
                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    </p>
                    <p className={style.contact_details_mobile}>
                        <span>☎️</span>:{" "}
                        <a href={`tel: ${contact.phoneNumber}`}>
                            {contact.phoneNumber}
                        </a>
                    </p>
                    <div className={style.contact_details_btns}>
                        <button
                            onClick={() =>
                                navigate(`/edit/${contact.contactId}`)
                            }
                        >
                            Edit
                        </button>
                        <button onClick={() => handleDelete(contact.contactId)}>
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Contact
