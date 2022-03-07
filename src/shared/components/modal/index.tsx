import React from "react";
import { useWeb3React } from "@web3-react/core";
import Modal from "react-modal";

import "./modal.css";

const MyModal = (props: any) => {
  const { deactivate } = useWeb3React();
  const handleWalletDisconnect = async () => {
    try {
      await deactivate();
      localStorage.setItem("isWalletConnected", "false");
      window.location.reload();
    } catch (ex) {
      console.error(ex);
    }
  };

  return (
    <div>
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        contentLabel="Wallet Modal"
        overlayClassName="modal-overlay"
        className="modal"
        ariaHideApp={false}
      >
        <div className="modal_content">
          <div id="modal__content--header">
            {typeof props.modalTitle === "string" ? (
              <h4>{props.modalTitle}</h4>
            ) : (
              props.modalTitle
            )}

            {localStorage.getItem("isWalletConnected") === "true" && (
              <button className="btn" onClick={handleWalletDisconnect}>
                Disconnect
              </button>
            )}
            <button
              title="Close"
              className=" clearBtn close_modal"
              onClick={props.closeModal}
            >
              {closeButtonSVg}
            </button>
          </div>
          <div id="modal__content--body">{props.children}</div>
        </div>
      </Modal>
    </div>
  );
};

export default MyModal;

export const closeButtonSVg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
