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
                    <div className="header"> Disclaimer </div>
                    <div className="content">
                        This website is meant to ease the creation of orders of battles for the game Arma 3, by converting CfgOrbat classes into a more readable and structured format.
                        <br /><br />
                        Imports should follow the standard as provided by the default template. While the importer can convert most of the inputs I've given it, it cannot correctly convert inputs which use the "subordinates[] = {curlyBraces}" attribute, to define the structure. It has to be nested classes.
                        <br /><br />
                        Comments should not be an issue, but isn't recommended.
                    </div>
                    <div className="header"> How To Use </div>
                    <div className="content">
                        You may import your own CfgOrbat into the website, or you may use the default template to begin.
                        <br /><br />
                        You can drag and drop nodes in the menu on the right, to arrange them as you please. Keep in mind they sort in the order they were added to a node.
                        <br /><br />
                        You can select a node, and edit it in the menu to the left. Categorical attributes have dropdowns for safer selection.
                        <br /><br />
                        Tags can be added by writing your tag, and then hitting enter.
                        <br /><br />
                        CfgName is automatically updated from the ID and Text Short attributes.
                    </div>

                    <div className="actions">
                        <button
                            className="modal-button"
                            onClick={() => {
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
