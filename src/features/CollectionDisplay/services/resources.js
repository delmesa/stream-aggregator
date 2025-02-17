import { nanoid } from "nanoid";
import axios from "axios";

const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3";

const streamerAxios = {
    youtube: axios.create({
        baseURL: YOUTUBE_API_URL,
        params: {
            key: import.meta.env.VITE_YOUTUBE_KEY,
        },
    }),
};

// key represents resource to pull from, and each entry needs a retrieveTracks and retrievePlaylists function
const retrieveFromResource = {};

retrieveFromResource["youtube"] = {
    // retrieve a track for preparing playback
    retrieveTracks: async (ids) => {
        const videoParams = {
            id: ids.join(), // YouTube API also accepts list of ids
            part: "snippet,contentDetails,player",
            fields: "items(id,contentDetails/duration,player/*)",
        };

        const videoResponse = await streamerAxios.youtube.get("/videos", {
            params: videoParams,
        });
        const items = videoResponse.data.items;

        const formedVideos = items.map((video) => {
            return {
                id: video.id,
                duration: video.contentDetails.duration,
                player: video.player,
            };
        });

        return formedVideos;
    },
    // retrieve playlists' details and their items' details as a collection
    retrievePlaylists: async (ids) => {
        const MAX_PAGE_RESULTS = 50;
        // playlist details (title, length, etc.)
        const detailsParams = {
            id: ids.join(),
            part: "snippet,contentDetails",
            maxResults: MAX_PAGE_RESULTS, // max acceptable value by YT; I'll adjust separately
            fields: "items(id,etag,snippet/title,contentDetails/itemCount)",
        };

        const detailsResponse = await streamerAxios.youtube.get("/playlists", {
            params: detailsParams,
        });
        const detailsItemsArray = detailsResponse.data.items;

        const contentsRefArray = [];
        // playlistItems endpoint can only access one playlist at a time
        // ... running a loop separate from the next to decouple so resources aren't
        // ... wasted in the event of an error in getting content
        for (const { id: plId } of detailsItemsArray) {
            // individual videos details
            const contentParams = {
                playlistId: plId,
                part: "snippet,contentDetails",
                maxResults: MAX_PAGE_RESULTS, // max page results
                fields: "nextPageToken,items(snippet(playlistId,title),contentDetails/videoId)",
            };

            // to be processed after (first page of) all content is successfully retrieved
            const contentResponse = await streamerAxios.youtube.get(
                "/playlistItems",
                { params: contentParams }
            );
            contentsRefArray.push({
                params: contentParams,
                data: contentResponse.data,
            });
        }

        // standardize track details
        // caveat: because anyone can upload music to YT, YT collections
        // ... will uniquely use 'uploader' attribute
        const formItems = (items) => {
            if (items.length === 0) {
                return [];
            }
            return items.map((item) => ({
                title: item.snippet.title,
                artist: null,
                externalId: item.contentDetails.videoId,
                host: "youtube",
            }));
        };

        const playlistInfo = [];
        for (let i = 0; i < detailsItemsArray.length; i++) {
            const plDetails = {
				id: nanoid(),
                externalId: detailsItemsArray[i].id,
                _etag: detailsItemsArray[i].etag,
                title: detailsItemsArray[i].snippet.title,
                itemCount: detailsItemsArray[i].contentDetails.itemCount,
                host: "youtube",
            };

            const contentsRef = contentsRefArray[i];

            let plContent = formItems(contentsRef.data.items);
            let nextPageToken = contentsRef.data.nextPageToken;
            // first page of contents has already been retrieved and processed
            for (let page = 1; page < Math.ceil(plDetails.itemCount / MAX_PAGE_RESULTS); page++) {
                const { data: nextContentData } =
                    await streamerAxios.youtube.get("/playlistItems", {
                        params: {
                            ...contentsRef.params,
                            pageToken: nextPageToken,
                        },
                    });
                plContent = plContent.concat(formItems(nextContentData.items));
                nextPageToken = nextContentData.nextPageToken;
            }

            playlistInfo.push({
                ...plDetails,
                content: plContent,
            });
        }

        return playlistInfo;
    },
};

export { retrieveFromResource };
