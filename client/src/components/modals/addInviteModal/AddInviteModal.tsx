import "./index.css";
import { useState } from "react";
import { addInviteApi } from "../../../api/invitesApi.ts";
import { AddInviteRequest } from "../../../types/requests/addInviteRequest.ts";
import { useSelector } from "react-redux";
import Invite from "../../../types/entities/invite";
import { Simulate } from "react-dom/test-utils";

interface AddInviteModalProps {
  show: boolean;
  onClose: () => void;
}

const AddInviteModal = ({ show, onClose }: AddInviteModalProps) => {

  const [city, setCity] = useState<string>("");
  const [dt, setDt] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [contacts, setContacts] = useState<string>("");

  const mainUser = useSelector(state => state.auth.user)

  const [addInviteState, setAddInviteState] = useState<string>("")
  const [defaultCitySet, setDefaultCitySet] = useState<boolean>(false);

  const addInvite = async () => {
    // validation

    const addInviteRequest: AddInviteRequest = {
      userId: mainUser.id,
      city: city,
      dt: dt,
      description: description,
      contacts: contacts
    }

    const invite: Invite | null = await addInviteApi(addInviteRequest);

    if (invite) {
      clearFields();
      setAddInviteState("ok");
    } else {
      setAddInviteState("error");
    }
  }

  const setDefaultCity = () => {
    setCity(mainUser.name);
    setDefaultCitySet(true)
  }

  const clearFields = () => {
    setDefaultCitySet(false);
    setCity("");
    setDt("");
    setDescription("");
    setContacts("");
  }

  const closeModal = () => {
    clearFields();
    setAddInviteState("");
    onClose();
  }

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Добавить инвайт</h2>
          <button onClick={closeModal} className="modal-close-button">&times;</button>
        </div>
        <div className="modal-body">
          <b>city</b>
          <input
            type="search"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          {
            !defaultCitySet ? <button onClick={setDefaultCity}>{mainUser.name}</button> : null
          }
          <b>date and time</b>
          <input
            type="datetime-local"
            onChange={(e) => setDt(e.target.value)}
            value={dt}
          />
          <b>desc</b>
          <textarea
            style={{"resize": "none", "height": "100px"}}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          {description.length}/1000
          <b>contacts</b>
          <textarea
            style={{"resize": "none", "height": "100px"}}
            onChange={(e) => setContacts(e.target.value)}
            value={contacts}
          />
          {contacts.length}/500
        </div>
        <div className="modal-footer">
          {addInviteState}
          <button onClick={addInvite}>send</button>
        </div>
      </div>
    </div>
  );
};

export default AddInviteModal;