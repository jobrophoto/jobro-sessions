import { useState } from "react";

const types = ["PORTRAIT", "BRAND", "PRODUCT"];
const settings = ["STUDIO", "OUTSIDE", "ENVIRONMETAL"];

function BookingFlow({ favorites }) {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState({
    type: "",
    setting: "",
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  return (
    <section>
      <h2>BOOK A SESSION</h2>
      <p>0{step} / 04</p>

      {step === 1 && (
        <div>
          <h3>SESSION TYPE</h3>
          {types.map((option) => (
            <button
              key={option}
              onClick={() => setBooking({ ...booking, type: option })}
              style={{
                border:
                  booking.type === option
                    ? "2px solid white"
                    : "1px solid gray",
              }}
            >
              {option}
            </button>
          ))}

          <h3>WHAT KIND OF SETTING?</h3>
          {types.map((option) => (
            <button
              key={option}
              onClick={() => setBooking({ ...booking, type: option })}
              style={{
                border:
                  booking.type === option
                    ? "2px solid white"
                    : "1px solid gray",
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      {step === 2 && <p>Step 2: date and time</p>}
      {step === 3 && <p>Step 3: your details</p>}
      {step === 4 && <p>Step 4: review</p>}

      <button onClick={() => setStep(step - 1)} disabled={step - 4}>
        NEXT
      </button>
      <button onClick={() => setStep(step - 2)} disabled={step - 1}>
        BACK
      </button>

      <pre>{JSON.stringify(booking, null, 2)}</pre>
    </section>
  );
}

export default BookingFlow;
