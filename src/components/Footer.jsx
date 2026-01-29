import React from 'react';
import '../styles/footer.scss';

const Footer = () => {
    return (
    <footer class="app-footer">
        <div class="container">
            <div class="footer_inner">
                <div class="footer_part">
                    <p class="footer_text">
                        Responsible lending criteria, fees and charges apply.<br/><br/>
                        Jaguar Financial Services is provided by Heartland Bank Limited.
                        Heartland Bank uses the Jaguar trademark under licence from Jaguar
                        Land Rover Limited, who is the registered proprietor of the trademark.
                    </p>
                </div>

                <div class="footer_part">
                    <ul class="footer_nav">
                        <li>
                            <a href="https://www.heartland.co.nz/privacy-statement"
                               target="_blank">
                                Privacy policy
                            </a>
                        </li>
                        <li>
                            <a href="https://www.heartland.co.nz/website-terms-of-use"
                               target="_blank">
                                Website terms of use
                            </a>
                        </li>
                        <li>
                            <a href="https://www.heartland.co.nz/unforeseen-hardship"
                               target="_blank">
                                Unforeseen hardship
                            </a>
                        </li>
                        <li>
                            <a href="https://www.jaguar.co.nz/offers-and-finance/consumer-loan"
                               target="_blank">
                                Rates, fees and terms
                            </a>
                        </li>
                        <li>
                            <a href="https://www.heartland.co.nz/compliments"
                               target="_blank">
                                Compliments
                            </a>
                        </li>
                        <li>
                            <a href="https://www.heartland.co.nz/complaints"
                               target="_blank">
                                Complaints
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    );
};

export default Footer;
