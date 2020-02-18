import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer classNameName="page-footer font-small">
    <div className="footer-copyright text-center py-3">
      <div className="row text-center">
        <p>github</p>
        <p>github</p>
        <p>github</p>
      </div>
      <p>Copyright ⓒ {currentYear}</p>
    </div>
</footer>

  );
}

export default Footer;