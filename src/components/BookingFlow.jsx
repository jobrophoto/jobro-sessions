import { useState } from "react";
import { photos } from "../data/photos";
import ReviewSection from "./ReviewSection";

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
  const [submitted, setSubmitted] = useState(false);
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
    } else if (!booking.email.includes("@") || !booking.email.includes(".")) {
      errors.email = "That email doesn't look right.";
    }
    return errors;
  }

  const errors = getErrors();
  const dateLabel = days.find((d) => d.value === booking.date)?.label;
  const savedPhotos = photos.filter((photo) => favorites.includes(photo.id));

  function handleNext() {
    if (step === 3 && Object.keys(errors).length > 0) {
      setAttempted(true);
      return;
    }
    setStep(step + 1);
  }

  if (submitted) {
    return (
      <section className="sent">
        <p className="sent__label">RECEIVED</p>
        <h2>REQUEST SENT!</h2>
        <p>I'll review your request and reply to {booking.email}.</p>

        <ReviewSection
          title="SESSION"
          rows={[
            { label: "TYPE", value: booking.type },
            { label: "SETTING", value: booking.setting },
            { label: "DATE", value: dateLabel },
            { label: "TIME", value: booking.time },
          ]}
        />
        <ReviewSection
          title="DETAILS"
          rows={[
            {
              label: "NAME",
              value: `${booking.firstName} ${booking.lastName}`,
            },
            { label: "EMAIL", value: booking.email },
            { label: "PHONE", value: booking.phone || "Not provided" },
          ]}
        />
      </section>
    );
  }

  return (
    <section>
      <h2>BOOK A SESSION</h2>
      <div className="progress">
        <span className="progress__count">0{step} / 04</span>
        <div className="progress__bar">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className={
                n <= step
                  ? "progress__segment progress__segment--filled"
                  : "progress__segment"
              }
            />
          ))}
        </div>
      </div>
      {step === 1 && (
        <div>
          <h3>SESSION TYPE</h3>
          <div className="choices">
            {types.map((option) => (
              <button
                key={option}
                className={
                  booking.type === option ? "chip chip--active" : "chip"
                }
                onClick={() => setBooking({ ...booking, type: option })}
              >
                {option}
              </button>
            ))}
          </div>

          <h3>WHAT KIND OF SETTING?</h3>
          <div className="choices">
            {settings.map((option) => (
              <button
                key={option}
                className={
                  booking.setting === option ? "chip chip--active" : "chip"
                }
                onClick={() => setBooking({ ...booking, setting: option })}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <h3>DATE</h3>
          <div className="choices">
            {days.map((day) => (
              <button
                key={day.value}
                className={
                  booking.date === day.value ? "chip chip--active" : "chip"
                }
                onClick={() =>
                  setBooking({ ...booking, date: day.value, time: "" })
                }
              >
                {day.label}
              </button>
            ))}
          </div>

          {booking.date !== "" && (
            <div>
              <h3>PICK A TIME</h3>
              <div className="choices">
                {times.map((option) => (
                  <button
                    key={option}
                    className={
                      booking.time === option ? "chip chip--active" : "chip"
                    }
                    onClick={() => setBooking({ ...booking, time: option })}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {step === 3 && (
        <div>
          <h3>YOUR DETAILS</h3>
          <div className="field">
            <label htmlFor="firstName">FIRST NAME</label>
            <input
              id="firstName"
              className={
                attempted && errors.firstName ? "input input--error" : "input"
              }
              value={booking.firstName}
              onChange={(e) =>
                setBooking({ ...booking, firstName: e.target.value })
              }
            />
            {attempted && errors.firstName && (
              <p className="field__error">ERROR: {errors.firstName}</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="lastName">LAST NAME</label>
            <input
              id="lastName"
              className={
                attempted && errors.lastName ? "input input--error" : "input"
              }
              value={booking.lastName}
              onChange={(e) =>
                setBooking({ ...booking, lastName: e.target.value })
              }
            />

            {attempted && errors.lastName && (
              <p className="field__error">ERROR: {errors.lastName}</p>
            )}
          </div>
          <div className="field">
            <label htmlFor="email">EMAIL</label>
            <input
              id="email"
              className={
                attempted && errors.email ? "input input--error" : "input"
              }
              type="email"
              value={booking.email}
              onChange={(e) =>
                setBooking({ ...booking, email: e.target.value })
              }
            />

            {attempted && errors.email && (
              <p className="field__error">ERROR: {errors.email}</p>
            )}
          </div>
          <div className="field">
            <label htmlFor="phone">PHONE</label>
            <input
              id="phone"
              className="input"
              type="tel"
              value={booking.phone}
              onChange={(e) =>
                setBooking({ ...booking, phone: e.target.value })
              }
            />
          </div>
          <div className="field">
            <label htmlFor="message">MESSAGE</label>
            <textarea
              id="message"
              className="input"
              value={booking.message}
              onChange={(e) =>
                setBooking({ ...booking, message: e.target.value })
              }
            />
          </div>
        </div>
      )}
      {step === 4 && (
        <div>
          <h3>REVIEW YOUR SESSION</h3>
          <ReviewSection
            title="SESSION"
            onEdit={() => setStep(1)}
            rows={[
              { label: "TYPE", value: booking.type },
              { label: "SETTING", value: booking.setting },
              { label: "DATE", value: dateLabel },
              { label: "TIME", value: booking.time },
            ]}
          />

          <ReviewSection
            title="DETAILS"
            onEdit={() => setStep(3)}
            rows={[
              {
                label: "NAME",
                value: `${booking.firstName} ${booking.lastName}`,
              },
              { label: "EMAIL", value: booking.email },
              { label: "PHONE", value: booking.phone || "Not provided" },
            ]}
          />

          <ReviewSection
            title="MESSAGE"
            onEdit={() => setStep(3)}
            rows={[
              {
                label: "MESSAGE",
                value: booking.message || "No message added",
              },
            ]}
          />

          <h4>YOUR REFERENCE SHOTS</h4>
          {savedPhotos.length === 0 ? (
            <div className="empty">
              <p>No reference shots saved.</p>
              <p>You can still book.</p>
            </div>
          ) : (
            <div className="shots">
              {savedPhotos.map((photo) => (
                <div key={photo.id} className="shot">
                  {photo.title}
                </div>
              ))}
            </div>
          )}
          <p className="shots__count">
            {savedPhotos.length} {savedPhotos.length === 1 ? "SHOT" : "SHOTS"}
          </p>
        </div>
      )}
      <div className="actions">
        <button
          className="button button--secondary"
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
        >
          BACK
        </button>
        {step < 4 ? (
          <button
            className="button button--primary"
            onClick={handleNext}
            disabled={!canContinue()}
          >
            NEXT
          </button>
        ) : (
          <button
            className="button button--primary"
            onClick={() => setSubmitted(true)}
          >
            CONFIRM
          </button>
        )}
      </div>
    </section>
  );
}

export default BookingFlow;
