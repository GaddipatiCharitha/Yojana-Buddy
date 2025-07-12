// Sample schemes (You can fetch this from schemes.json later)
const schemes = [
  {
    name: "Ayushman Bharat",
    criteria: { bpl: true },
    description: "Free healthcare for BPL families.",
    link: " https://pmjay.gov.in"
  },
  {
    name: "PM Kisan Yojana",
    criteria: { farmer: true },
    description: "₹6000/year direct benefit to farmers.",
    link: "https://pmkisan.gov.in"
  },
  {
    name: "Old Age Pension Scheme",
    criteria: { age: "senior" },
    description: "Monthly pension for citizens aged 60+.",
    link: "#"
  },
  {
    name: "Rural Housing Scheme",
    criteria: { rural: true, bpl: true },
    description: "Subsidized housing for rural BPL families.",
    link: " https://pmayg.nic.in"
  }
];

// Convert string "true"/"false" to boolean
function toBool(val) {
  return val === "true";
}

document.getElementById("quizForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = new FormData(e.target);
  const userData = {
    bpl: toBool(form.get("bpl")),
    woman: toBool(form.get("woman")),
    farmer: toBool(form.get("farmer")),
    rural: toBool(form.get("rural")),
    disabled: toBool(form.get("disabled")),
    age: form.get("age")
  };

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<h2>Eligible Schemes:</h2>";

  const matched = schemes.filter(scheme => {
    for (let key in scheme.criteria) {
      if (userData[key] !== scheme.criteria[key]) return false;
    }
    return true;
  });

  if (matched.length === 0) {
    resultsDiv.innerHTML += "<p>Sorry, no schemes matched your inputs.</p>";
  } else {
    matched.forEach(scheme => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${scheme.name}</h3>
        <p>${scheme.description}</p>
        <a href="${scheme.link}" target="_blank">Learn More</a>
      `;
      resultsDiv.appendChild(card);
    });
  }
});
