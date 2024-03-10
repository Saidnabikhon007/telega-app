import { useEffect, useState } from "react";
import "./addContact.style.css";
import { TiDeleteOutline } from "react-icons/ti";
import { v4 as uuidv4 } from "uuid";

export const reserveInputs = {
  id: "",
  name: "",
  surname: "",
  phoneNumber: "",
};

export function AddContact({ setStatusAddContact, contacts, setContacts }) {
  const [input, setInput] = useState(reserveInputs);

  function Delete() {
    setStatusAddContact(false);
  }

  function onADD() {
    const contactData = localStorage.getItem("contacts");
    contacts = contactData ? JSON.parse(contactData) : [];
    if (input.name !== "" && input.surname !== "" && input.phoneNumber !== "") {
      contacts.push({ ...input, id: uuidv4() });
      localStorage.setItem("contacts", JSON.stringify(contacts));
      setStatusAddContact(false);
      setContacts(contacts);
    }
  }

  return (
    <div className="AddContact">
      <div className="AddContainer">
        <TiDeleteOutline className="add-delete" onClick={Delete} />
        <h1 className="addContactText">ADD CONTACT</h1>
        <input
          type="text"
          placeholder="Name"
          className="addContact-input"
          onChange={(name) => {
            setInput((prev) => ({ ...prev, name: name.target.value }));
          }}
        />
        <input
          type="text"
          placeholder="Surname"
          className="addContact-input"
          onChange={(surname) => {
            setInput((prev) => ({ ...prev, surname: surname.target.value }));
          }}
        />
        <input
          type="number"
          placeholder="Phone Number"
          className="addContact-input"
          onChange={(phoneNumber) => {
            setInput((prev) => ({
              ...prev,
              phoneNumber: phoneNumber.target.valueAsNumber.toString(),
            }));
          }}
        />
        <div className="add-buttons">
          <button className="addContact-butn">Cancel</button>
          <button className="addContact-butn" onClick={onADD}>
            add contact
          </button>
        </div>
      </div>
    </div>
  );
}
