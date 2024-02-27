import React from 'react';

function Footer() {
  return (
    <footer className="flex-row fixed bottom-0 w-full flex items-center justify-between p-4 bg-gray-200 border-t-1 border-gray-300">
      <div className="flex items-center"> 
        <img src="your-logo.png" alt="Company Logo" className="w-48 flex justify-start" /> 
      </div>
      <p className="flex items-center justify-center align-text-bottom">&copy; 2024 Company Name. All rights reserved.</p>
      <div className="text-right">Thane</div>
    </footer>
  );
}

export default Footer;
