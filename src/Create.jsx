import React, { useId, useState } from "react"
import style from "./Create.module.css"
import { useOutletContext } from "react-router-dom"

const Create = () => {
    const [contacts, setContacts] = useOutletContext()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const generateUniqueId = () => {
        return `${Date.now()}-${Math.floor(Math.random() * 10000)}`
    }

    const resetForm = () => {
        setFirstName("")
        setLastName("")
        setEmail("")
        setPhoneNumber("")
    }

    const handleSubmit = (e) => {
        // Prevent page reload
        e.preventDefault()
        const contactId = generateUniqueId()
        const formData = { firstName, lastName, email, phoneNumber, contactId }
        const newContacts = [...contacts, formData]

        setContacts(newContacts)

        localStorage.setItem("contacts", JSON.stringify(newContacts))
        // Reset form and state afterwards
        resetForm()
    }

    return (
        <div className={style.contact_form}>
            <h1>Create Contact</h1>
            <form onSubmit={handleSubmit} onReset={resetForm}>
                <label>
                    Firstname:
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </label>
                <label>
                    Lastname:
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </label>
                <label>
                    E-mail:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Phone Number:
                    <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </label>
                <button type="submit">Submit</button>
                <button type="reset">Reset</button>
            </form>
        </div>
    )
}

export default Create
