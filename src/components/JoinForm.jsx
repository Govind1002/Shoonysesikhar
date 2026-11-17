import { useEffect, useState } from "react";
import "./JoinForm.css";

export default function JoinForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const openModal = () => {
    setSubmitted(false);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // अभी केवल frontend testing के लिए
    console.log("Join Application:", Object.fromEntries(formData.entries()));

    setSubmitted(true);
    e.currentTarget.reset();
  };

  return (
    <>
      {/* Existing Join Us Button */}
      <button className="join-btn" onClick={openModal}>
        Join Us
      </button>

      {/* Popup */}
      {isOpen && (
        <div
          className="join-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className="join-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="joinFormTitle"
          >
            <button
              className="join-close"
              onClick={closeModal}
              aria-label="Close"
              type="button"
            >
              &times;
            </button>

            {!submitted ? (
              <form id="joinForm" onSubmit={handleSubmit}>
                <h2 id="joinFormTitle">Join Us</h2>

                <h3 className="section-title">
                  व्यक्तिगत जानकारी
                </h3>

                <label>पूरा नाम <span className="req">*</span></label>
                <input type="text" name="fullname" required />

                <label>पिता का नाम</label>
                <input type="text" name="father" />

                <div className="row">
                  <div>
                    <label>जन्मतिथि <span className="req">*</span></label>
                    <input type="date" name="dob" required />
                  </div>

                  <div>
                    <label>मोबाइल नंबर <span className="req">*</span></label>
                    <input
                      type="tel"
                      name="mobile"
                      pattern="[0-9]{10}"
                      maxLength="10"
                      title="10 अंकों का नंबर लिखें"
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div>
                    <label>WhatsApp नंबर</label>
                    <input
                      type="tel"
                      name="whatsapp"
                      pattern="[0-9]{10}"
                      maxLength="10"
                    />
                  </div>

                  <div>
                    <label>ईमेल आईडी</label>
                    <input type="email" name="email" />
                  </div>
                </div>

                <label>फोटो अपलोड <span className="req">*</span></label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  required
                />

                <label>पूरा पता <span className="req">*</span></label>
                <textarea name="address" rows="2" required />

                <h3 className="section-title">पद का चयन</h3>

                <label>पद का चयन करें</label>
                <select name="post" defaultValue="">
                  <option value="">-- चुनें --</option>
                  <option>स्टेट ब्यूरो प्रमुख</option>
                  <option>मंडल ब्यूरो प्रमुख</option>
                  <option>जिला ब्यूरो प्रमुख</option>
                  <option>तहसील संवाददाता</option>
                  <option>ब्लॉक संवाददाता</option>
                  <option>नगर संवाददाता</option>
                  <option>रिपोर्टर / संवाददाता</option>
                  <option>विज्ञापन प्रतिनिधि</option>
                  <option>डिजिटल मीडिया रिपोर्टर</option>
                  <option>वीडियो एडिटर</option>
                  <option>सोशल मीडिया मैनेजर</option>
                </select>

                <h3 className="section-title">कार्य क्षेत्र</h3>

                <div className="row">
                  <div>
                    <label>राज्य <span className="req">*</span></label>
                    <input type="text" name="state" required />
                  </div>

                  <div>
                    <label>जिला <span className="req">*</span></label>
                    <input type="text" name="district" required />
                  </div>
                </div>

                <div className="row">
                  <div>
                    <label>तहसील</label>
                    <input type="text" name="tehsil" />
                  </div>

                  <div>
                    <label>ब्लॉक / नगर</label>
                    <input type="text" name="block" />
                  </div>
                </div>

                <h3 className="section-title">अनुभव एवं योग्यता</h3>

                <label>शैक्षिक योग्यता <span className="req">*</span></label>
                <input type="text" name="education" required />

                <label>पत्रकारिता का अनुभव</label>

                <div className="radio-group">
                  <label className="radio">
                    <input
                      type="radio"
                      name="experience"
                      value="फ्रेशर"
                      defaultChecked
                    />
                    फ्रेशर
                  </label>

                  <label className="radio">
                    <input
                      type="radio"
                      name="experience"
                      value="अनुभवी"
                    />
                    अनुभवी
                  </label>
                </div>

                <label>पूर्व संस्थान का नाम (यदि हो)</label>
                <input type="text" name="prev_org" />

                <label>अपनी विशेषता / कौशल</label>
                <textarea name="skills" rows="2" />

                <label>पत्रकारिता क्यों करना चाहते हैं?</label>
                <textarea name="why" rows="3" />

                <h3 className="section-title">दस्तावेज अपलोड</h3>

                <label>आधार कार्ड (वैकल्पिक)</label>
                <input
                  type="file"
                  name="aadhaar"
                  accept="image/*,.pdf"
                />

                <label>शैक्षिक प्रमाणपत्र (वैकल्पिक)</label>
                <input
                  type="file"
                  name="certificate"
                  accept="image/*,.pdf"
                />

                <label>पूर्व संस्थान का पहचान पत्र (यदि हो)</label>
                <input
                  type="file"
                  name="prev_id"
                  accept="image/*,.pdf"
                />

                <button type="submit" className="submit-btn">
                  Submit Application
                </button>
              </form>
            ) : (
              <div className="success">
                <div className="tick">✅</div>
                <h3>Details successfully submitted!</h3>
                <p>धन्यवाद, हम जल्द ही आपसे संपर्क करेंगे।</p>

                <button
                  type="button"
                  className="submit-btn"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}