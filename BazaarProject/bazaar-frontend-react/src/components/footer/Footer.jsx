import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn, faGoogle } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
    <div className="superNav py-2 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 centerOnMobile">
            <a
              className="d-none d-lg-inline-block d-md-inline-block d-sm-inline-block d-xs-none me-5"
              href="https://github.com/Mohamed-ELakhal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>
                <FontAwesomeIcon icon={faGithub} /> moh-magdy
              </strong>
            </a>
            <a
              className="d-none d-lg-inline-block d-md-inline-block d-sm-inline-block d-xs-none me-5"
              href="https://www.linkedin.com/in/mohamed-elakhal-6a9113160/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>
                <FontAwesomeIcon icon={faLinkedinIn} /> moh-magdy
              </strong>
            </a>
            <div
              className="d-none d-lg-inline-block d-md-inline-block d-sm-inline-block d-xs-none me-5"
            >
              <FontAwesomeIcon icon={faGoogle} />
              <strong> mohamedelakhal92@gmail.com</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
    </footer>
  );
};

export default Footer;
