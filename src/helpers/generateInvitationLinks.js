import { typeObject } from "./getObjectByType";

export const generateInvitationLinks = (ratings) => {
  return ratings?.map(
    (item, index) =>
      isSupportedPlatform(item.type) && (
        <option
          key={index}
          value={
            item.type === "google" && item.placeId
              ? `https://search.google.com/local/writereview?placeid=${item.placeId}`
              : item.url
          }
          // value={item.url}
        >
          {item.name} ({typeObject[item.type]?.title})
        </option>
      )
  );
};

const isSupportedPlatform = (platform) =>
  platform === "google" || platform === "recose" || platform === "trustpilot";

//
// eslint-disable-next-line
const getPlaceId = (placeUrl) => {
  if (!placeUrl) return "";
  const url = new URL(placeUrl);
  const params = new URLSearchParams(url.search);
  const placeId = params.get("cid");

  console.log(url);

  return placeId;
};
