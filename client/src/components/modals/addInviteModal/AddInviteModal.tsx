import { useState } from "react";
import { addInviteApi } from "../../../api/invitesApi.ts";
import { AddInviteRequest } from "../../../types/requests/addInviteRequest.ts";
import Invite from "../../../types/entities/invite";
import ErrorBlock from "../../general/errorBlock/ErrorBlock.tsx";
import CityAutocomplete from "../../cityAutocomplete/CityAutocomplete.tsx";
import "./index.scss";
import Button from "../../general/button/Button.tsx";
import { useTypedSelector } from "../../../store/store.ts";

interface AddInviteModalProps {
  show: boolean,
  onClose: () => void,
  setDataChanged: (b: boolean) => void
}

const AddInviteModal = ({ show, onClose, setDataChanged }: AddInviteModalProps) => {

  const [city, setCity] = useState<string>("");
  const [dt, setDt] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [contacts, setContacts] = useState<string>("");

  const [error, setError] = useState<string>('');

  const mainUser = useTypedSelector(state => state.auth.user);

  const addInvite = async () => {
    if (!mainUser) {
      return;
    }
    // validation
    const addInviteRequest: AddInviteRequest = {
      userId: mainUser.id,
      city: city,
      dt: dt,
      description: description,
      contacts: contacts
    }
    const [state, data]: [boolean, (Invite | string)] = await addInviteApi(addInviteRequest);
    if (state) {
      clearFields();
      setDataChanged(true);
      setError('');
    } else {
      setError(data as string);
    }
  }
  const clearFields = () => {
    setCity('');
    setDt('');
    setDescription('');
    setContacts('');
  }

  const closeModal = () => {
    clearFields();
    setError('');
    onClose();
  }

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Create invite</h2>
          <button onClick={closeModal} className="modal-close-button">&times;</button>
        </div>
        <div className="modal-body">
          <CityAutocomplete setSelectedCity={setCity}/>
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
          {error.length > 0 ? <ErrorBlock message={error}/> : null}
          <Button text="Create" onClick={addInvite}/>
        </div>
      </div>
    </div>
  );
};

export default AddInviteModal;