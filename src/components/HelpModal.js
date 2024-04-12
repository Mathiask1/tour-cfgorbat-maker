import React from 'react';
import Popup from 'reactjs-popup';
import '../styles/Modal.css';


const helpModal = () => {
    const curlyBraces = '{}';
    return (
        <Popup
            trigger={<button className="modal-button">Help</button>}
            modal
            nested
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header"> Help </div>
                    <div className="content">
                        This website is meant to ease the creation of orders of battles for the game Arma 3, by converting CfgOrbat classes into a more readable and structured format.
                        <br /><br />
                        Imports should follow the standard as provided by the default template. While the importer can convert most of the inputs I've given it, it cannot correctly convert inputs which use the "subordinates[] = {curlyBraces}" attribute.
                    </div>

                    <div className="actions">
                        <button
                            className="modal-button"
                            onClick={() => {
                                console.log('modal closed ');
                                close();
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </Popup>
    )
};

export default helpModal;
