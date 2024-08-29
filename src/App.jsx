import { useState } from "react"
import style from "./App.module.css"
import Sidebar from "./Sidebar"

const App = () => {
    const [data, setData] = useState([
        { firstName: "Jason", lastName: "Statham", mobile: "0812345678", email: "jason@statham.com" },
        { firstName: "Arnold", lastName: "Schwarznigger", mobile: "0812345678", email: "jason@statham.com" },
        { firstName: "Tom", lastName: "Cruise", mobile: "0812345678", email: "jason@statham.com" },
        { firstName: "Keanu", lastName: "Reeves", mobile: "0812345678", email: "jason@statham.com" },
        { firstName: "Channing", lastName: "Tatum", mobile: "0812345678", email: "jason@statham.com" },
    ])
    return (
        <div className={style.container}>
            <Sidebar contacts={data} />
            <div className={style.contact_details}>
                <h1 className={style.contact_details_name}>
                    {data[0].firstName} {data[0].lastName}
                </h1>
                <p className={style.contact_details_email}>
                    <span>📧</span>: <a href={`mailto:${data[0].email}`}>{data[0].email}</a>
                </p>
                <p className={style.contact_details_mobile}>
                    <span>☎️</span>: <a href={`tel: ${data[0].mobile}`}>{data[0].mobile}</a>
                </p>
                <div className={style.contact_details_btns}>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default App
