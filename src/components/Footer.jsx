import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons' 

library.add(fab);

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer text-white">
      <div className="footer-copyright text-center">
        <a href="https://github.com/ferolo3000" rel="noopener noreferrer" target="_blank"><FontAwesomeIcon icon={['fab', 'github']} size="1x" className="icon" /></a> 
        <a href="https://www.linkedin.com/in/fernandaromerolo/?locale=en_US" rel="noopener noreferrer" target="_blank"><FontAwesomeIcon icon={['fab', 'linkedin']} size="1x" className="icon" /></a>
        <p className="copyright-text">Copyright ⓒ {currentYear}</p>
      </div>
    </footer>

  );
}

export default Footer;