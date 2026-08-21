(function () {
  var config = window.TOR_FORMS || {};
  var email = config.leadEmail;
  if (!email || email.indexOf("@") === -1) return;

  var submitUrl = "https://formsubmit.co/ajax/" + encodeURIComponent(email);
  var protocolLabels = {
    "zero-waste": "Zero Waste Protocol (B2B)",
    permaculture: "Free land survey — Permaculture Design",
  };

  function assetPrefix() {
    return document.body && document.body.dataset.assetPrefix ? document.body.dataset.assetPrefix : "";
  }

  function thankYouUrl() {
    var path = config.thankYouPath || "forms/thank-you.html";
    if (/^https?:\/\//.test(path)) return path;
    return assetPrefix() + path;
  }

  function setStatus(form, message, isError) {
    var status = form.querySelector(".form-status");
    if (!status) return;
    status.hidden = !message;
    status.textContent = message || "";
    status.classList.toggle("form-status-error", !!isError);
    status.classList.toggle("form-status-success", !!message && !isError);
  }

  function protocolFromQuery() {
    var params = new URLSearchParams(window.location.search);
    return params.get("protocol") || "";
  }

  function applyProtocolSelect(select, value) {
    if (!select || !value) return;
    if (select.querySelector('option[value="' + value + '"]')) {
      select.value = value;
    }
  }

  function validateForm(form) {
    var valid = form.checkValidity();
    if (!valid) {
      form.reportValidity();
      return false;
    }

    var consent = form.querySelector('input[name="consent"]');
    if (consent && !consent.checked) {
      setStatus(form, "Please confirm consent to be contacted.", true);
      consent.focus();
      return false;
    }

    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();
    var form = event.currentTarget;
    setStatus(form, "");

    if (!validateForm(form)) return;

    var submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalLabel = submitBtn.textContent;
      submitBtn.textContent = "Sending…";
    }

    var formData = new FormData(form);
    var protocolValue = formData.get("protocol") || "";
    var protocolLabel = protocolLabels[protocolValue] || protocolValue || "Protocol inquiry";
    formData.set("_subject", "Temple of Roots lead — " + protocolLabel);
    formData.set("_template", "table");
    formData.set("_captcha", "false");

    fetch(submitUrl, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Request failed");
        return response.json();
      })
      .then(function () {
        window.location.href = thankYouUrl() + "?protocol=" + encodeURIComponent(protocolValue);
      })
      .catch(function () {
        setStatus(
          form,
          "Something went wrong sending your request. Email us directly or try again in a moment.",
          true
        );
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.dataset.originalLabel || "Submit request";
        }
      });
  }

  document.querySelectorAll(".lead-form").forEach(function (form) {
    form.addEventListener("submit", handleSubmit);
    applyProtocolSelect(form.querySelector('select[name="protocol"]'), protocolFromQuery());
  });

  document.querySelectorAll(".protocol-scroll-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      var protocol = button.getAttribute("data-protocol");
      var targetId = protocol === "zero-waste" ? "zero-waste-lead" : "land-survey";
      var target = document.getElementById(targetId) || document.getElementById("permaculture-lead");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (protocol !== "zero-waste") {
        document.querySelectorAll(".lead-form").forEach(function (form) {
          applyProtocolSelect(form.querySelector('select[name="protocol"]'), protocol);
          var hidden = form.querySelector('input[name="protocol"][type="hidden"]');
          if (hidden) hidden.value = protocol;
        });
        var firstField = target && target.querySelector("input, select, textarea");
        if (firstField) firstField.focus();
      }
    });
  });
})();
