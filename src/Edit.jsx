import React, { useEffect, useState } from "react"
import style from "./Edit.module.css"
import { useOutletContext, useNavigate, useParams } from "react-router-dom"

const Edit = () => {
    // Gets all the contacts
    const [contacts, setContacts] = useOutletContext()

    // Form data
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    // The individual contact to be edited
    const [userContact, setUserContact] = useState(null)

    // Component states to handle loading and errors while fetching contact
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        let contacts = localStorage.getItem("contacts")
        if (contacts) {
            setLoading(false)
            // Get the contact to be edited
            contacts = JSON.parse(contacts)
            const userContact = contacts.find((item) => item.contactId === id)
            
            setUserContact(userContact)
            setFirstName(userContact.firstName)
            setLastName(userContact.lastName)
            setEmail(userContact.email)
            setPhoneNumber(userContact.phoneNumber)
        } else {
            setLoading(false)
            setError(true)
        }
    }, [id])

    const resetForm = () => {
        setFirstName("")
        setLastName("")
        setEmail("")
        setPhoneNumber("")
    }

    const handleSubmit = (e) => {
        // Prevent page reload
        e.preventDefault()
        // Get the contact id of the old contact
        const contactId = userContact.contactId
        // Create object containing all contact details
        const formData = { firstName, lastName, email, phoneNumber, contactId }
        // Remove the old contact from the contacts array
        const newContact = contacts.filter(
            (contact) => contact.contactId !== contactId
        )
        // Add the new edited contact to the array
        newContact.push(formData)

        setContacts(newContact)

        localStorage.setItem("contacts", JSON.stringify(newContact))
        // Reset form and state afterwards
        resetForm()

        navigate(`/contact/${contactId}`)
    }

    return (
        <>
            {loading && <h2>Loading...</h2>}
            {error && <h2>There was an error fetching that contact!</h2>}
            {userContact && (
                <div className={style.contact_form}>
                    <h1>Create Contact</h1>
                    <form onSubmit={handleSubmit} onReset={resetForm}>
                        <label>
                            Firstname:
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Lastname:
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            E-mail:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Phone Number:
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Submit</button>
                        <button type="reset">Reset</button>
                    </form>
                </div>
            )}
        </>
    )
}

export default Edit
