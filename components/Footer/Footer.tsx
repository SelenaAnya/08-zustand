import React from "react";
import css from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={css.footer}>
            <div className={css.content}>
                <p>&copy; 2024 NoteHub. All rights reserved.</p>
                <div className={css.wrap}>
                    <p>Developer: Kovalenko Anna</p>
                    <p>
                        Contact us:
                        <a href="mailto:selena.anya@gmail.com">selena.anya@gmail.com</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;