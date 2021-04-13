import { CARD_STATUS, DECK_SIZE, CARD_SIZES, API_PAGE_SIZE } from "../constants";

const BASE_URL = "https://picsum.photos";

/**
 * Create new game
 */
const gameService = async () => {
  const urls = await getRandomUrls();
  const deck = urls.concat(urls);

  while (deck.length > DECK_SIZE) {
    deck.pop();
  }

  const shuffledDeck = deck.sort(() => 0.5 - Math.random());

  return shuffledDeck;
};

const fetchImages = async (page) => {
  const apiUrl = `${BASE_URL}/v2/list?page=${page}&limit=100`;
  const res = await fetch(apiUrl);
  const data = await res.json();

  return data;
}

export const getRandomUrls = async () => {
  const urlArray = [];
  const imageSet = new Set();
  const page = Math.floor(Math.random() * API_PAGE_SIZE) + 1;
  const urlList = await fetchImages(page);

  // Randomly pick cards from list from API
  while (imageSet.size < Math.ceil(DECK_SIZE / 2)) {
    const i = Math.floor(Math.random() * urlList.length) + 1

    if (urlList[i]) {
      const { id } = urlList[i]

      if (!imageSet.has(id)) {
        imageSet.add(id)
        urlArray.push({
          id,
          url: `${BASE_URL}/id/${id}/${CARD_SIZES.width}/${CARD_SIZES.height}`,
          status: CARD_STATUS.HIDDEN,
        });
      }
    }
  }

  return urlArray;
};

export default gameService;
