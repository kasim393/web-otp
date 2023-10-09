import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [otpcode, setOtpcode] = useState("");

  // another approach
  // if ("OTPCredential" in window) {
  //   const ac = new AbortController();
  //   navigator.credentials
  //     .get({
  //       otp: { transport: ["sms"] },
  //       signal: ac.signal,
  //     })
  //     .then((otp) => {
  //       setOtpcode(otp.code);
  //       ac.abort();
  //     })
  //     .catch(() => {
  //       ac.abort();
  //     });
  // }
  useEffect(() => {
    let ac = new AbortController();
    setTimeout(() => {
      // abort after 10 minutes
      ac.abort();
    }, 10 * 60 * 1000);
    navigator.credentials
      .get({
        otp: { transport: ["sms"] },
        signal: ac.signal,
      })
      .then((otp) => {
        setOtpcode(otp.code);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <h1>Web OTP example</h1>
      <h2>Your OTP is: {otpcode}</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        autoComplete="one-time-code"
        inputMode="numeric"
        value={otpcode}
        onChange={(e) => setOtpcode(e.target.value)}
      />
    </>
  );
}

export default App;
