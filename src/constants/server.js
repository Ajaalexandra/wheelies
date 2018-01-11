const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "/checkout"
    : "http://localhost:3001/checkout";
export default PAYMENT_SERVER_URL;
