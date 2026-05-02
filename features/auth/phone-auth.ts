import twilio from "twilio";

const accountSID = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = twilio(accountSID, authToken);

export const sendSMS = async (body: string, userNumber: string) => {
  let msgOptions = {
    from: process.env.TWILIO_PHONE_NO,
    to: userNumber,
    body,
  };

  try {
    return await client.messages.create(msgOptions);
  } catch (error) {
    console.error(error);
  }
};
