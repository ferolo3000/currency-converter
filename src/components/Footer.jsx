import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons' 

library.add(fab);

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="page-footer font-small bg-primary text-white">
    <div className="footer-copyright text-center py-3">
      <div className="text-center">
      <FontAwesomeIcon icon={['fab', 'github']} size="2x" />
      <FontAwesomeIcon icon={['fab', 'linkedin']} size="2x" />
      </div>
      <p>Copyright ⓒ {currentYear}</p>
    </div>
</footer>

  );
}

export default Footer;