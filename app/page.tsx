const handleFormSubmit = async (e) => {
  e.preventDefault();
  if (isSubmitting) return;

  const payload = {
    name: formData.name.trim(),
    phone: formData.phone.trim(),
    message: formData.message.trim(),
  };

  if (!payload.name || !payload.phone || !payload.message) {
    alert("All fields are required");
    return;
  }

  if (!/^\d{10}$/.test(payload.phone)) {
    alert("Mobile number must be 10 digits");
    return;
  }

  setIsSubmitting(true);

  try {
    console.log("FORM WORKING", payload);

    const formURL =
      "https://docs.google.com/forms/d/e/1FAIpQLSci7RYWbRjow0wJyENxj9UBuAErtE_v5aIwl7QrDn1ygynVdg/formResponse";

    const formDataGoogle = new FormData();
    formDataGoogle.append("entry.1687974789", payload.name);     // Name
    formDataGoogle.append("entry.385439171", payload.phone);     // Mobile
    formDataGoogle.append("entry.1185637948", payload.message);  // Course

    await fetch(formURL, {
      method: "POST",
      mode: "no-cors",
      body: formDataGoogle,
    });

    // SUCCESS FLOW
    setSubmittedName(payload.name);
    setFormData({ name: "", phone: "", email: "", message: "" });

    setSubmitStatus({
      type: "success",
      message: "Lead submitted successfully",
    });

    setCountdown(5);
    setShowThankYou(true);

  } catch (error) {
    console.error("Submission error:", error);

    setSubmitStatus({
      type: "error",
      message: "Something went wrong. Try again.",
    });
  } finally {
    setIsSubmitting(false);
  }
};