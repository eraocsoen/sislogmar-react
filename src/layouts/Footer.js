// @flow
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = (): React$Element<any> => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="container-fluid">
                <Row className="d-flex w-full justify-content-end">
                    <div>{currentYear} © Sislogmar</div>

                </Row>
            </div>
        </footer>
    );
};

export default Footer;
