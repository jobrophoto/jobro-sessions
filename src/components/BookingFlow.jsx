import { useState } from "react";

const types = ["PORTRAIT", "BRAND", "PRODUCT"];
const settings = ["STUDIO", "OUTSIDE", "ENVIRONMENTAL"];
const times = [
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
];

function nextDays(count) {
  const result = [];
  for (let i = 1; i <= count; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    result.push({
      value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
      label: d
        .toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
        .toUpperCase(),
    });
  }
  return result;
}

const days = nextDays(14);

function BookingFlow({ favorites }) {
  const [attempted, setAttempted] = useState(false);
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

  function canContinue() {
    if (step === 1) return booking.type !== "" && booking.setting !== "";
    if (step === 2) return booking.date !== "" && booking.time !== "";
    return true;
  }

  function getErrors() {
    const errors = {};
    if (booking.firstName.trim() === "")
      errors.firstName = "Enter your first name.";
    if (booking.lastName.trim() === "")
      errors.lastName = "Enter your last name.";
    if (booking.email.trim() === "") {
      errors.email = "Enter your email so I can reply.";
    } else if (!email.includes("@") || !email.includes(".")) {
      errors.email = "That email doesn't look right.";
    }
    return errors;
  }

  const errors = getErrors();

  function handleNext() {
    if (step === 3 && Object.keys(errors).length > 0) {
      setAttempted(true);
      return;
    }
    setStep(step + 1);
  }

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
          {settings.map((option) => (
            <button
              key={option}
              onClick={() => setBooking({ ...booking, setting: option })}
              style={{
                border:
                  booking.setting === option
                    ? "2px solid white"
                    : "1px solid gray",
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      {step === 2 && (
        <div>
          <h3>DATE</h3>
          {days.map((day) => (
            <button
              key={day.value}
              onClick={() =>
                setBooking({ ...booking, date: day.value, time: "" })
              }
              style={{
                border:
                  booking.date === day.value
                    ? "2px solid white"
                    : "1px solid grey",
              }}
            >
              {day.label}
            </button>
          ))}

          {booking.date !== "" && (
            <div>
              <h3>PICK A TIME</h3>
              {times.map((option) => (
                <button
                  key={option}
                  onClick={() => setBooking({ ...booking, time: option })}
                  style={{
                    border:
                      booking.time === option
                        ? "2px solid white"
                        : "1px solid grey",
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      {step === 3 && (
        <div>
          <h3>YOUR DETAILS</h3>

          <label>
            FIRST NAME
            <input
              value={booking.firstName}
              onChange={(e) =>
                setBooking({ ...booking, firstName: e.target.value })
              }
            />
          </label>
          {attempted && errors.firstName && (
            <p style={{ color: "red" }}>ERROR: {errors.firstName}</p>
          )}
          <div>
            <label>
              LAST NAME
              <input
                value={booking.lastName}
                onChange={(e) =>
                  setBooking({ ...booking, lastName: e.target.value })
                }
              />
            </label>
            {attempted && errors.lastName && (
              <p style={{ color: "red" }}>ERROR: {errors.lastName}</p>
            )}
          </div>
          <div>
            <label>
              EMAIL
              <input
                type="email"
                value={booking.email}
                onChange={(e) =>
                  setBooking({ ...booking, email: e.target.value })
                }
              />
            </label>
            {attempted && errors.email && (
              <p style={{ color: "red" }}>ERROR: {errors.email}</p>
            )}
          </div>
          <div>
            <label>
              PHONE
              <input
                type="tel"
                value={booking.phone}
                onChange={(e) =>
                  setBooking({ ...booking, phone: e.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label>
              MESSAGE
              <textarea
                value={booking.message}
                onChange={(e) =>
                  setBooking({ ...booking, message: e.target.value })
                }
              />
            </label>
          </div>
        </div>
      )}
      {step === 4 && <p>Step 4: review</p>}
      <button onClick={() => setStep(step - 1)} disabled={step === 1}>
        BACK
      </button>
      <button onClick={handleNext} disabled={step === 4 || !canContinue()}>
        NEXT
      </button>
      <pre>{JSON.stringify(booking, null, 2)}</pre>
    </section>
  );
}

export default BookingFlow;
