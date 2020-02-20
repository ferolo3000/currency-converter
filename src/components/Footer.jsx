import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons' 

library.add(fab);

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer text-white">
      <div className="text-center">
        <FontAwesomeIcon icon={['fab', 'github']} size="2x" />
        <FontAwesomeIcon icon={['fab', 'linkedin']} size="2x" />
        <p>Copyright ⓒ {currentYear}</p>
      </div>
    </footer>

  );
}

export default Footer;