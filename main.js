const dailyButton = document.querySelector("#daily");
const weeklyButton = document.querySelector("#weekly");
const monthlyButton = document.querySelector("#monthly");

async function getAllCards() {
  const response = await fetch("./data.json");
  const cards = await response.json();

  if (!cards) return;

  return cards;
}

function renderCards(cards, timeframe) {
  cards.forEach((card) => {
    const { title, timeframes } = card;
    const cardClass = "card--" + title.split(" ").join("").toLowerCase();

    const titleElement = document.querySelector(`.${cardClass} .card__title p`);
    titleElement.textContent = title;

    const descriptionCurrentElement = document.querySelector(
      `.${cardClass} .card__description .description__current`
    );
    descriptionCurrentElement.textContent =
      timeframes[timeframe].current + "hrs";

    const descriptionPreviousElement = document.querySelector(
      `.${cardClass} .card__description .description__previous`
    );

    let previousDescription;
    if (timeframe === "daily") previousDescription = "Yesterday - ";
    else if (timeframe === "weekly") previousDescription = "Last Week - ";
    else previousDescription = "Last Month - ";
    descriptionPreviousElement.textContent =
      previousDescription + timeframes[timeframe].previous + "hrs";
  });
}

async function handleListener(event) {
  const cards = await getAllCards();

  const value = event.target.textContent.toLowerCase();
  renderCards(cards, value);

  dailyButton.className = "";
  weeklyButton.className = "";
  monthlyButton.className = "";

  event.target.classList.add("active");
}

dailyButton.addEventListener("click", handleListener);
weeklyButton.addEventListener("click", handleListener);
monthlyButton.addEventListener("click", handleListener);

getAllCards().then((res) => renderCards(res, "daily"));
