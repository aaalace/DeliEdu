import InviteList from "../../components/invite/inviteList/InviteList.tsx";
import { useState } from "react";
import AddInviteModal from "../../components/modals/addInviteModal/AddInviteModal.tsx";
import Button from "../../components/general/button/Button.tsx";
import "./index.scss"

const Dashboard = () => {

  const [showModal, setShowModal] = useState(false);

  const [dataChanged, setDataChanged] = useState(false);

  const handleDataChanged = (state: boolean) => {
    setDataChanged(state);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="dashboard-page">
      <h1>дашборд</h1>
      <Button text="Add invite" onClick={openModal}/>
      <InviteList dataChanged={dataChanged} setDataChanged={handleDataChanged}/>
      <AddInviteModal show={showModal} onClose={closeModal} setDataChanged={handleDataChanged}/>
    </div>
  )
}

export default Dashboard