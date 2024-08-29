import style from "./Sidebar.module.css"

const Sidebar = ({ contacts }) => {
    return (
        <nav className={style.sidebar}>
            <div className={style.sidebar_inputs}>
                <button>New Contact</button>
                <input type="text" id="search" placeholder="Search..." />
            </div>
            <div className={style.contact_list}>
                {contacts.map((contact) => (
                    <a href={`/contact/:id`} className={style.contact_item}>
                        {contact.firstName} {contact.lastName}
                    </a>
                ))}
            </div>
        </nav>
    )
}

export default Sidebar
