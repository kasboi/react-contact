import { useEffect, useState } from "react"
import style from "./Contact.module.css"
import { useOutletContext, useParams } from "react-router-dom"

const Contact = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [contact, setContact] = useState(null)

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
                        <span>📧</span>: <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    </p>
                    <p className={style.contact_details_mobile}>
                        <span>☎️</span>: <a href={`tel: ${contact.phoneNumber}`}>{contact.phoneNumber}</a>
                    </p>
                    <div className={style.contact_details_btns}>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Contact
