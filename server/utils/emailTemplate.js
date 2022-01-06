const activateTemplate = async (email, username, url) => {
  let infoEmail = {
    from: `${process.env.EMAIL_ADDRESS_FROM}`,
    to: email,
    subject: 'Code - sharing knowledge',
    html: `
          <div style="width:90%;margin:auto;
           padding: 50px 20px; font-size: 110%;">
          <h2 style="text-align: center; color: #555;">
          Hello ${username}, welcome to Code, we are very happy to have you with us!</h2>
        
                  <p style="font-weight:bold;">Click the button below to confirm your account.:</p>
        
                  <div style="display:flex;flex-direction:column;align-items:center;
                  justify-content:center;">
                  <br />
                  <a href=${url} style="background: blue;text-decoration: none;
                  color: white; padding: 10px 20px; margin: 10px 0; font-weight:bold;
                   width:15rem; text-align:center; border-radius:5px;">
                 Access</a>
                  </div>
                  <br />
                    <p style="font-weight:bold;"> If the button above does not work, use the link:</p>
                    <div>${url}</div>
            </div>
                `
  };
  return infoEmail;
};

const resetTemplate = async (email, username, url) => {
  let infoEmail = {
    from: `${process.env.EMAIL_ADDRESS_FROM}`,
    to: email,
    subject: 'Code - sharing knowledge.',
    html: `
          <div style="width:90%;margin:auto;
           padding: 50px 20px; font-size: 110%;">
          <h2 style="text-align: center; color: #555;">
          Hello ${username}, below is the link to reset your password:</h2>
        
                  <p style="font-weight:bold;">Click on the button below to change your password:</p>
        
                  <div style="display:flex;flex-direction:column;align-items:center;
                  justify-content:center;">
                  <br />
                  <a href=${url} style="background: blue;text-decoration: none;
                  color: white; padding: 10px 20px; margin: 10px 0;
               font-weight:bold; width:15rem; text-align:center; border-radius:5px;">
                 Access</a>
                  </div>
                  <br />
                    <p style="font-weight:bold;"> If the button above does not work, use the link:</p>
                    <div>${url}</div>
            </div>
                `
  };
  return infoEmail;
};

module.exports = { activateTemplate, resetTemplate };
