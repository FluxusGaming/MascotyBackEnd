const mailOptions = async (email, subject, message) => {
  let options = {
    from: process.env.EMAIL,
    to: email,
    subject,
    text: message,
  };
  return options;
};
export default mailOptions;
