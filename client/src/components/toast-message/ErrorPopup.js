import React from "react";

const ErrorPopup = ({ error, onClose }) => {
    console.log(error)
    const popupStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2
    };

    const popupContentStyle = {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        maxWidth: "400px",
        textAlign: "center",
    };

    const closeButtonStyle = {
        marginTop: "20px",
        cursor: "pointer",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
    };

    return (
        <div style={popupStyle}>
            <div style={popupContentStyle}>
                <h2>Error</h2>
                <p>{error}</p>
                <button style={closeButtonStyle} onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default ErrorPopup;
