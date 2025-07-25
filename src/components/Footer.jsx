import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer sm:footer-horizontal footer-center text-base-content p-4 bg-base-300">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved
          </p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
