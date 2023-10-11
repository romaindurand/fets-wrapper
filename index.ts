import { NormalizeOAS, createClient,  } from 'fets'
import type { spotifyOpenApiSchema } from './oas';

type NormalizedOAS = NormalizeOAS<typeof spotifyOpenApiSchema>;
const fetsClient = createClient<NormalizedOAS>({
  endpoint: 'https://api.spotify.com/v1',
});

type Route = keyof typeof fetsClient;

async function callSpotifyApi(route: Route, method, params) {
  const result = await fetsClient[route][method]({
    ...params,
    headers: {
      Authorization: `Bearer ${123}`,
    },
  });
  return result;
}
