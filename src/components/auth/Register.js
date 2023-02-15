import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Register = (props) => {
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: false,
        password: "",
        isRanger: false
    })
    let navigate = useNavigate()

    const registerNewUser = (e) => {
        e.preventDefault()
        return fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem(
                      "np_token",
                      JSON.stringify({
                        id: createdUser.id,
                        name: createdUser.first_name,
                        staff: createdUser.is_staff,
                        token: createdUser.token
                      })
                    );
                    navigate("/")
                    window.location.reload(false);
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={registerNewUser}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register to Explore National Parks</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input onChange={updateUser}
                           type="text" id="first_name" className="form-control"
                           placeholder="Enter your first name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input onChange={updateUser}
                           type="text" id="last_name" className="form-control"
                           placeholder="Enter your last name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <input onChange={updateUser}
                        type="password" id="password" className="form-control"
                        placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <input onChange={(evt) => {
                        const copy = {...user}
                        copy.isRanger = evt.target.checked
                        setUser(copy)
                    }}
                        type="checkbox" id="isRanger" />
                    <label htmlFor="email"> I am a Park Ranger </label>
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

