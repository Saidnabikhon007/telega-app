import { useEffect, useState } from "react";
import "./useParam.style.css";
import { useParams } from "react-router-dom";
import { BiShare } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdFrontHand } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineWidthWide } from "react-icons/md";
import { ImAttachment } from "react-icons/im";
import { BsEmojiSmile } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";

const massageContact = [
  {
    id: uuidv4(),
    inputMassage: "",
    sender: "",
    receiver: "",
  },
];
console.log(massageContact);

export function UseParam({ contacts, setContacts }) {
  const [statusinput, setStatusInput] = useState(massageContact);
  const [massages, setMassages] = useState([]);

  const { id } = useParams();
  const foundParams = contacts.find((el) => el.id === id);

  function onAddMassage() {
    if (statusinput.inputMassage !== "") {
      setMassages([
        ...massages,
        { ...statusinput, receiver: id, sender: "1000" },
      ]);
      setStatusInput({
        inputMassage: "",
      });

      console.log("massages: ", massages);
    }
  }

  return (
    <div className="UseParam">
      <div className="UseParam-header">
        <div className="UseParam-header1">
          <h1 className="header1-text">
            <i>{foundParams.name}</i>
          </h1>
          <div className="header1-Icons">
            <IoMdSearch style={{ cursor: "pointer" }} />
            <FaPhone style={{ cursor: "pointer" }} />
            <MdOutlineWidthWide style={{ cursor: "pointer" }} />
            <HiOutlineDotsVertical style={{ cursor: "pointer" }} />
          </div>
        </div>
        <div className="UseParam-header2">
          {massages.map((elem) => {
            return (
              <div>
                <p className="inputMassage">
                  {elem.receiver === id && elem.inputMassage}
                </p>
              </div>
            );
          })}
        </div>
        <div className="UseParam-header3">
          <ImAttachment className="header3-Icon" />
          <input
            type="text"
            value={statusinput.inputMassage}
            placeholder="Write a massage"
            className="header3-input"
            onChange={(inputMassage) =>
              setStatusInput((prev) => ({
                ...prev,
                inputMassage: inputMassage.target.value,
              }))
            }
          />
          <BsEmojiSmile className="header3-Icon" />
          <IoSend className="header3-IconSend" onClick={onAddMassage} />
        </div>
      </div>
      <div className="UseParam-container">
        <h1 className="UseParam-container-text-user">
          <i>User Info</i>
        </h1>
        <h1 className="UseParam-container-text">
          <i>
            {foundParams.name} {foundParams.surname}
          </i>
        </h1>
        <h1 className="UseParam-container-text-phone">
          <i>Phone: {foundParams.phoneNumber}</i>
        </h1>
        <div className="border">
          <div className="Share">
            <BiShare className="ShareIcon" />
            <i className="ShareText"> Share this contact</i>
          </div>

          <div className="Share">
            <MdOutlineEdit className="ShareIcon" />
            <i className="borderShareText"> Share this contact</i>
          </div>

          <div className="Share">
            <MdDelete className="handIcon" />
            <i className="borderShareText"> Delete contact</i>
          </div>

          <div className="Share">
            <MdFrontHand className="handIcon" />
            <i className="borderShareText"> Block user </i>
          </div>
        </div>
      </div>
    </div>
  );
}
