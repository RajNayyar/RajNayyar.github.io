const rashis = [
  { name: "Mesh", en: "Aries", icon: "♈", title: "Move with purpose.", text: "A clear decision can unlock momentum today. Speak directly, protect your energy and place your attention on the work that truly matters.", color: "Saffron", number: 9, energy: "High" },
  { name: "Vrishabh", en: "Taurus", icon: "♉", title: "Trust steady progress.", text: "Patience brings a better result than pressure. Give practical matters your care and make room for one simple pleasure this evening.", color: "Emerald", number: 6, energy: "Grounded" },
  { name: "Mithun", en: "Gemini", icon: "♊", title: "Let ideas meet action.", text: "A conversation carries more potential than it first appears. Listen for what is not being said, then respond with clarity and warmth.", color: "Yellow", number: 5, energy: "Curious" },
  { name: "Kark", en: "Cancer", icon: "♋", title: "Honour your inner tide.", text: "Home and close relationships ask for gentle attention. A thoughtful boundary will create more closeness, not less.", color: "Pearl", number: 2, energy: "Reflective" },
  { name: "Singh", en: "Leo", icon: "♌", title: "Lead from the heart.", text: "Your confidence is magnetic today when paired with generosity. Share credit, make the first move and allow your warmth to guide you.", color: "Gold", number: 1, energy: "Radiant" },
  { name: "Kanya", en: "Virgo", icon: "♍", title: "Refine, don’t rush.", text: "Small details deserve attention, but perfection does not. Complete what is useful, simplify your plan and leave space to breathe.", color: "Olive", number: 5, energy: "Focused" },
  { name: "Tula", en: "Libra", icon: "♎", title: "Choose what feels balanced.", text: "A relationship or agreement benefits from an honest reset. Fairness begins when you include your own needs in the equation.", color: "Rose", number: 6, energy: "Harmonious" },
  { name: "Vrishchik", en: "Scorpio", icon: "♏", title: "Look beneath the surface.", text: "Your intuition is especially sharp. Use it to understand, not assume, and a complicated situation will begin to reveal its simplest truth.", color: "Maroon", number: 8, energy: "Intense" },
  { name: "Dhanu", en: "Sagittarius", icon: "♐", title: "Follow the wider horizon.", text: "Fresh perspective arrives through learning, travel or an unexpected exchange. Keep your plans flexible enough to welcome it.", color: "Purple", number: 3, energy: "Expansive" },
  { name: "Makar", en: "Capricorn", icon: "♑", title: "Build for the long term.", text: "Your discipline is an advantage, but you do not have to carry everything alone. Delegate one task and protect your best thinking time.", color: "Navy", number: 8, energy: "Steady" },
  { name: "Kumbh", en: "Aquarius", icon: "♒", title: "Make space for the new.", text: "An unconventional solution may be the right one. Test it thoughtfully, invite useful feedback and resist explaining yourself too soon.", color: "Sky Blue", number: 4, energy: "Inventive" },
  { name: "Meen", en: "Pisces", icon: "♓", title: "Listen to quiet knowing.", text: "Creative and emotional currents run deep today. Give them an outlet, then return to practical matters with a clearer mind.", color: "Sea Green", number: 7, energy: "Intuitive" }
];

const grid = document.querySelector("#zodiacGrid");
const rashiSelect = document.querySelector("#rashiSelect");
const fields = {
  icon: document.querySelector("#forecastIcon"), english: document.querySelector("#forecastEnglish"), name: document.querySelector("#forecastName"),
  title: document.querySelector("#forecastTitle"), text: document.querySelector("#forecastText"), color: document.querySelector("#luckyColor"),
  number: document.querySelector("#luckyNumber"), energy: document.querySelector("#dayEnergy")
};

const liveCache = new Map();
let currentRequest = 0;

async function showRashi(index) {
  const item = rashis[index];
  Object.entries({ icon:item.icon, english:item.en.toUpperCase(), name:item.name, title:item.title, text:item.text, color:item.color, number:item.number, energy:item.energy }).forEach(([key,value]) => fields[key].textContent = value);
  document.querySelectorAll(".zodiac-btn").forEach((button,i) => button.classList.toggle("active", i === index));
  rashiSelect.value = String(index);
  document.querySelector("#forecastCard").animate([{opacity:.35,transform:"translateY(8px)"},{opacity:1,transform:"none"}],{duration:360,easing:"ease-out"});

  const status = document.querySelector("#horoscopeStatus");
  const requestId = ++currentRequest;
  status.className = "feed-status loading";
  status.innerHTML = "<span></span> Loading today’s live reading…";

  try {
    let live = liveCache.get(item.en.toLowerCase());
    if (!live) {
      const response = await fetch(`/api/horoscope?sign=${encodeURIComponent(item.en.toLowerCase())}`, { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Live feed unavailable");
      const payload = await response.json();
      live = payload.data;
      if (!live?.horoscope) throw new Error("Invalid live feed");
      liveCache.set(item.en.toLowerCase(), live);
    }
    if (requestId !== currentRequest) return;
    fields.text.textContent = live.horoscope;
    fields.title.textContent = "Today’s guidance.";
    if (live.date) {
      const feedDate = new Date(`${live.date}T00:00:00`);
      document.querySelector("#forecastDate").textContent = feedDate.toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long" });
    }
    status.className = "feed-status live";
    status.innerHTML = "<span></span> Live reading · updated today";
  } catch {
    if (requestId !== currentRequest) return;
    status.className = "feed-status fallback";
    status.innerHTML = "<span></span> Showing saved guidance · live feed unavailable";
  }
}

rashis.forEach((rashi,index) => {
  const button = document.createElement("button");
  button.className = `zodiac-btn${index === 0 ? " active" : ""}`;
  button.innerHTML = `<span>${rashi.icon}</span><small>${rashi.name}</small>`;
  button.setAttribute("aria-label", `Show daily horoscope for ${rashi.name}, ${rashi.en}`);
  button.addEventListener("click", () => showRashi(index));
  grid.appendChild(button);
  const option = document.createElement("option");
  option.value = String(index);
  option.textContent = `${rashi.icon}  ${rashi.name} (${rashi.en})`;
  rashiSelect.appendChild(option);
});
rashiSelect.addEventListener("change", event => showRashi(Number(event.target.value)));

const today = new Date();
document.querySelector("#forecastDate").textContent = today.toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long" });
document.querySelector("#year").textContent = today.getFullYear();
document.querySelector("#dateInput").min = today.toISOString().split("T")[0];
document.querySelector("#birthDateInput").max = today.toISOString().split("T")[0];
showRashi(0);

const modal = document.querySelector("#bookingModal");
document.querySelectorAll(".open-booking").forEach(button => button.addEventListener("click", () => {
  if (cardModal.open) cardModal.close();
  modal.showModal();
}));
document.querySelector(".modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", event => { if (event.target === modal) modal.close(); });

const cardModal = document.querySelector("#cardModal");
document.querySelectorAll(".open-card").forEach(button => button.addEventListener("click", () => cardModal.showModal()));
document.querySelector(".card-close").addEventListener("click", () => cardModal.close());
cardModal.addEventListener("click", event => { if (event.target === cardModal) cardModal.close(); });

document.querySelector("#bookingForm").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const birthTime = data.get("birthTime") || "Not known";
  const message = `Namaste P. S. Nayyar ji, I would like to request an astrology consultation.%0A%0AName: ${encodeURIComponent(data.get("name"))}%0APhone: ${encodeURIComponent(data.get("phone"))}%0AGender: ${encodeURIComponent(data.get("gender"))}%0ADate of birth: ${encodeURIComponent(data.get("birthDate"))}%0ATime of birth: ${encodeURIComponent(birthTime)}%0APlace of birth: ${encodeURIComponent(data.get("birthPlace"))}%0ATopic: ${encodeURIComponent(data.get("topic"))}%0APreferred appointment date: ${encodeURIComponent(data.get("date"))}%0APreferred time: ${encodeURIComponent(data.get("time"))}`;
  window.open(`https://wa.me/919888215620?text=${message}`, "_blank", "noopener,noreferrer");
});

const menuButton = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
menuButton.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => navLinks.classList.remove("open")));
window.addEventListener("scroll", () => document.querySelector(".site-header").classList.toggle("scrolled", scrollY > 20));

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), { threshold:.12 });
document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
