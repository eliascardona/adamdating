import React from "react";

export const PageFooter = () => {

  const footerStyles={
    position: 'relative',
    bottom: '0 !important',
    padding: '50px 30px 50px 80px',
    color: '#fefefe',
    backgroundColor: '#111111'
  }

  return (
    <>
      <div style={footerStyles}>
        <p>© 2022. Elías Cardona</p>
      </div>
    </>
  );
};
