import React from 'react';

function Footer() {
    return (
        <footer className="bg-blue-900 text-white py-4 mt-10 shadow-inner">
            <div className="text-center text-sm">
                © {new Date().getFullYear()} Employee Management System. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
