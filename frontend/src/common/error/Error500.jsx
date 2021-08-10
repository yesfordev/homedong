import React from 'react';
import { Link } from 'react-router-dom';

export default function Error500() {
  return (
    <div className="container">
      <h1>500</h1>
      <p>
        Something went wrong.
        <Link to="/">Go back to the homepage</Link>
      </p>
    </div>
  );
}
