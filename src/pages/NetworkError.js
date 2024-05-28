import React from 'react';
import '../styles/NetworkError.css'; // Import your CSS file

const NetworkError = () => {
  return (
    <div className="error-container">
      <h1>Error 404: Page Not Reachable</h1>
      <div className="error-content">
        <p>Sorry, the page you are looking for cannot be reached at the moment.</p>
        <p>This could be due to a variety of reasons:</p>
        <ul>
          <li>The webpage may have been moved or deleted.</li>
          <li>You may have mistyped the URL.</li>
          <li>There could be a temporary issue with the server or your internet connection.</li>
        </ul>
        <p>Please try the following:</p>
        <ol>
          <li>Check the URL for any typos and try again.</li>
          <li>Refresh the page to see if it loads properly.</li>
          <li>If you clicked on a link, try going back to the previous page and clicking the link again.</li>
          <li>Verify your internet connection to ensure it is stable and active.</li>
          <li>If the problem persists, you can contact the website administrator for further assistance.</li>
        </ol>
        <p>We apologize for any inconvenience this may have caused.</p>
      </div>
      <div className="error-links">
        <p><a href="/">Home</a></p>
        <p><a href="/contact">Contact Us</a></p>
      </div>
    </div>
  );
};

export default NetworkError;
