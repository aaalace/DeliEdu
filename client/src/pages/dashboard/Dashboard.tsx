import InviteList from "../../components/invite/inviteList/InviteList.tsx";
import { useState } from "react";
import AddInviteModal from "../../components/modals/addInviteModal/AddInviteModal.tsx";

const Dashboard = () => {

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>дашборд</h1>
      <button onClick={openModal}>Добавить инвайт</button>
      <InviteList/>
      <AddInviteModal show={showModal} onClose={closeModal}/>
    </div>
  )
}

export default Dashboard