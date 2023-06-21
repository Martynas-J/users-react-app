import { useEffect, useState } from "react";
import { API_URL } from "../../Components/Config/Config";
import axios from "axios";
import { Link, useNavigate, useParams} from "react-router-dom";


const UserForm = () => {
    const [user, setUser] = useState("")
    const userId = useParams().id
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            axios.get(`${API_URL}/users/${userId}`)
                .then(res => setUser(res.data))
        }
    }, [userId])

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [suite, setSuite] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [catchPhrase, setCatchPhrase] = useState('');
    const [bs, setBs] = useState('');

    const [buttonText, setButtonText] = useState("Create new user");

    const nameHandler = event => setName(event.target.value);
    const usernameHandler = event => setUsername(event.target.value);
    const emailHandler = event => setEmail(event.target.value);
    const streetHandler = event => setStreet(event.target.value);
    const suiteHandler = event => setSuite(event.target.value);
    const cityHandler = event => setCity(event.target.value);
    const zipcodeHandler = event => setZipcode(event.target.value);
    const latHandler = event => setLat(event.target.value);
    const lngHandler = event => setLng(event.target.value);
    const phoneHandler = event => setPhone(event.target.value);
    const websiteHandler = event => setWebsite(event.target.value);
    const companyNameHandler = event => setCompanyName(event.target.value);
    const catchPhraseHandler = event => setCatchPhrase(event.target.value);
    const bsHandler = event => setBs(event.target.value);

    useEffect(() => {
        if (user) {
            setButtonText("Save")
            console.log(user)
            const { name, username, email, address, phone, website, company } = user
            const { street, suite, city, zipcode, geo } = address
            const { lat, lng } = geo
            setName(name)
            setUsername(username);
            setEmail(email);
            setStreet(street);
            setSuite(suite);
            setCity(city);
            setZipcode(zipcode);
            setLat(lat);
            setLng(lng);
            setPhone(phone);
            setWebsite(website);
            setCompanyName(company.name);
            setCatchPhrase(company.catchPhrase);
            setBs(company.bs);
        }
    }, [user])

    const newUserHandler = (event) => {
        event.preventDefault();
        const newUser = {
            name,
            username,
            email,
            address: {
                street,
                suite,
                city,
                zipcode,
                geo: {
                    lat,
                    lng
                }
            },
            phone,
            website,
            company: {
                name: companyName,
                catchPhrase,
                bs
            }
        }
        if (user) {
            axios.put(`${API_URL}/users/${userId}`, newUser)
            navigate('../UsersPage');
        }else {
            axios.post(`${API_URL}/users`, newUser)
        }
        setName("")
        setUsername('');
        setEmail('');
        setStreet('');
        setSuite('');
        setCity('');
        setZipcode('');
        setLat('');
        setLng('');
        setPhone('');
        setWebsite('');
        setCompanyName('');
        setCatchPhrase('');
        setBs('');
    }

    return (
        <div className="user-form-wrapper">
            <h1 className="user-data-form">User Data</h1>
            <form className="user-form" onSubmit={newUserHandler}>
                <div className="form-control">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="username" value={name} onChange={nameHandler} />
                </div>
                <div className="form-control">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={username} onChange={usernameHandler} />
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={emailHandler} />
                </div>
                <div className="form-control">
                    <label htmlFor="phone">Phone:</label>
                    <input type="text" id="phone" name="phone" value={phone} onChange={phoneHandler} />
                </div>
                <div className="form-control">
                    <label htmlFor="website">Website:</label>
                    <input type="text" id="website" name="website" value={website} onChange={websiteHandler} />
                </div>
                <div className="user-company" >
                    <span>Company:</span>
                    <div className="form-control">
                        <label htmlFor="companyName">Company name:</label>
                        <input type="text" id="companyName" name="companyName" value={companyName} onChange={companyNameHandler} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="catchPhrase">Catch phrase:</label>
                        <input type="text" id="catchPhrase" name="catchPhrase" value={catchPhrase} onChange={catchPhraseHandler} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="bs">Bs:</label>
                        <input type="text" id="bs" name="bs" value={bs} onChange={bsHandler} />
                    </div>
                </div>
                <div className="user-address" >
                    <span>Address:</span>
                    <div className="form-control">
                        <label htmlFor="street">Street:</label>
                        <input type="text" id="street" name="street" value={street} onChange={streetHandler} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="suite">Suite:</label>
                        <input type="text" id="suite" name="suite" value={suite} onChange={suiteHandler} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="city">City:</label>
                        <input type="text" id="city" name="city" value={city} onChange={cityHandler} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="zipcode">Zip code:</label>
                        <input type="text" id="zipcode" name="zipcode" value={zipcode} onChange={zipcodeHandler} />
                    </div>
                    <div className="user-geo" >
                        <span>Geo:</span>
                        <div className="form-control">
                            <label htmlFor="lat">Lat:</label>
                            <input type="number" id="lat" name="lat" value={lat} onChange={latHandler} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="lng">Lng:</label>
                            <input type="number" id="lng" name="lng" value={lng} onChange={lngHandler} />
                        </div>
                    </div>
                </div>
                <input type="submit" value={buttonText} />
            </form>
            <Link className="user-form-link" to="../UsersPage">Back to users page</Link>
        </div>
    )
}
export default UserForm