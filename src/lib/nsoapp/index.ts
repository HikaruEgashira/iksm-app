import { load } from "cheerio";
import pMemoize from "p-memoize";

// https://github.com/frozenpandaman/splatnet2statink/commit/e7760c48c550e42c6ab10dbc99fec4b2cdef71a7
// def get_nsoapp_version():
// 	'''Fetches the current Nintendo Switch Online app version from the Google Play Store.'''

// 	page = requests.get("https://play.google.com/store/apps/details?id=com.nintendo.znca&hl=en")
// 	soup = BeautifulSoup(page.text, 'html.parser')
// 	elts = soup.find_all("span", {"class": "htlgb"})
// 	ver = elts[7].get_text().strip()
// 	return ver
const _getNsoappVersion = async () => {
  const text = await (
    await fetch(
      "https://play.google.com/store/apps/details?id=com.nintendo.znca&hl=en"
    )
  ).text();
  const $ = load(text);
  const elts = $("span.htlgb");
  const ver = elts.eq(7).text().trim();
  return ver;
};

export const getNsoappVersion = pMemoize(_getNsoappVersion);
