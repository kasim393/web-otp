import { useState } from "react";
import "./App.css";

function App() {
  const [otpcode, setOtpcode] = useState("");

  if ("OTPCredential" in window) {
    const ac = new AbortController();

    navigator.credentials
      .get({
        otp: { transport: ["sms"] },
        signal: ac.signal,
      })
      .then((otp) => {
        setOtpcode(otp.code);
        ac.abort();
      })
      .catch(() => {
        ac.abort();
      });
  }

  return (
    <>
      <h1>Web OTP example</h1>
      <h2>Your OTP is: {otpcode}</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otpcode}
        onChange={(e) => setOtpcode(e.target.value)}
      />
      <br />
      <br />
      <h3>
        Send below message from another phone <br /> while chrome is active on
        your mobile screen
      </h3>
      <br />
      <br />
      <h3 className="msg">
        <pre>
          Your test code is: 555444
          <br />
          <br />
          @csb-jsfh2.netlify.app #555444
        </pre>
      </h3>
    </>
  );
}

export default App;
