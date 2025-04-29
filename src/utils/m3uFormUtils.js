import { listRequest } from "./requestMethodUtils";

export const m3uParserByRegEx = async (currentPlaylist) => {
  try {
    const listdata = await listRequest(currentPlaylist);
    console.log("sdaada", listdata);

    const data = listdata.flatMap((item, index) => {
      const { title } = item;

      const result = {
        title: item,
        id: index + 1,
        group: { groupname: "" },
        tvname: "",
        tvlogo: "",
      };

      // Extract group title
      const groupTitleMatch = /group-title="([^"]*)"/.exec(title);
      if (groupTitleMatch) {
        result.group.groupname = groupTitleMatch[1];
      }

      // Extract TV name
      const tvNameMatch = /,(.*)$/.exec(title);
      if (tvNameMatch) {
        result.tvname = tvNameMatch[1].trim();
      }

      // Extract TV logo
      const tvLogoMatch = /tvg-logo="([^"]+)"/.exec(title);
      if (tvLogoMatch) {
        result.tvlogo = tvLogoMatch[1];
      }

      return result.tvname ? result : null;
    }).filter((item) => item !== null);

    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};
