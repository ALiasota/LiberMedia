document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phoneCountryCode = document.getElementById("phoneCountryCode").value;
    const phoneNumber = document.getElementById("phoneNumber").value;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !isValidEmail(email) ||
      !phoneCountryCode ||
      !phoneNumber
    ) {
      alert("Please fill in all required fields with valid data.");
      return;
    }

    const fullPhoneNumber = phoneCountryCode + phoneNumber;

    sendDataToCRM(firstName, lastName, email, fullPhoneNumber);
  });

function sendDataToCRM(firstName, lastName, email, phoneNumber) {
  const data = {
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    PhoneNumber: phoneNumber,
    ApiKey: "TlRZNE5GODFNVEJmTlRZNE5GOD0=",
    ApiPassword: "ZTLV6Ava1J",
    CampaignID: "8286",
  };
  fetch("https://tracker.pablo.partners/repost.php?act=register", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: encodeFormData(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.ret_code === "200") alert("Success");
      else alert(data.ret_message);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error");
    });
}

function encodeFormData(data) {
  const formData = new URLSearchParams();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData.toString();
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const headerTimer = document.querySelector(".header-timer");
headerTimer.innerHTML = "07:00";

function countdownTimer(startTime) {
  const [startMinutes, startSeconds] = startTime.split(":").map(Number);

  let seconds = startSeconds;
  let minutes = startMinutes;

  function formatNumber(num) {
    return num < 10 ? `0${num}` : num;
  }

  const interval = setInterval(function () {
    if (seconds === 0 && minutes > 0) {
      minutes--;
      seconds = 59;
    } else if (seconds > 0) {
      seconds--;
    }

    headerTimer.innerHTML = `${formatNumber(minutes)}:${formatNumber(seconds)}`;

    if (seconds === 0 && minutes === 0) {
      clearInterval(interval);
    }
  }, 1000);
}

countdownTimer("07:00");
