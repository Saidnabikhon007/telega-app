import { useEffect, useState } from "react";
import "./App.css";
import { IoMenuOutline } from "react-icons/io5";
import { Login } from "./User/Login/login";
import { AddContact } from "./User/Add-Contact/addContact";
import { Link, Route, Routes } from "react-router-dom";
import { UseParam } from "./User/Use-Params/useParam";

function App() {
  const [statusLogin, setStatusLogin] = useState(false);
  const [statusAddContact, setStatusAddContact] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (localStorage.length) {
      const userData = localStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : null;
      if (user) {
        setStatusLogin(true);
      }

      const contactsData = localStorage.getItem("contacts");
      const getContacts = contactsData ? JSON.parse(contactsData) : [];
      console.log(getContacts);
      if (getContacts.length) {
        setContacts(getContacts);
      }
    }
  }, []);

  function onLogout() {
    localStorage.removeItem("user");
    window.location.reload();
  }

  function onClickAddContact() {
    setStatusAddContact(true);
  }

  return !statusLogin ? (
    <Login setStatusLogin={setStatusLogin} />
  ) : (
    <div className="App">
      {statusAddContact && (
        <AddContact
          setStatusAddContact={setStatusAddContact}
          contacts={contacts}
          setContacts={setContacts}
        />
      )}
      <div className="bg_white">
        <div className="Search">
          <IoMenuOutline className="threeline" />
          <input type="text" placeholder="Search" className="BgWhiteInput" />
        </div>

        <div className="massages">
          <button className="btnAdd" onClick={onClickAddContact}>
            ADD CONTACT
          </button>
          <Routes>
            <Route
              path="/form"
              element={
                <AddContact contacts={contacts} setContacts={setContacts} />
              }
            ></Route>
          </Routes>

          <div className="contactes">
            {contacts.map((el, index) => {
              return (
                <Link
                  to={`/form/${el.id}`}
                  className="Contact-Post"
                  key={el.id}
                >
                  <div className="Contact" key={index}>
                    <h1 className="Contact-Post">{el.name}</h1>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <button className="btn_Logout" onClick={onLogout}>
          Logout
        </button>
      </div>
      <Routes>
        <Route
          path="/form/:id"
          element={<UseParam contacts={contacts} setContacts={setContacts} />}
        ></Route>
        <Route
          path="/"
          element={
            <div className="bg_green">
              <h1 className="text_bgGreen">Select massage</h1>
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;

// {
//   id: uuidv4(),
//   text: text,
//   sender: 1000,
//   receiver: req.body.receiver,
// }
