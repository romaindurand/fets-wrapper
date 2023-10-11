import { NormalizeOAS, createClient,  } from 'fets'
import type { spotifyOpenApiSchema } from './oas';

type NormalizedOAS = NormalizeOAS<typeof spotifyOpenApiSchema>;
const fetsClient = createClient<NormalizedOAS>({
  endpoint: 'https://api.spotify.com/v1',
});

// the fets client itself is correctly typed, offers autocomplete + typechecking
fetsClient['/playlists/{playlist_id}/tracks'].get({
  headers: {
    Authorization: `Bearer ${123}`,
  },
  params: {
    playlist_id: '123',
  }
})

// but when I try to create a wrapper function, the params are not correctly typed
async function callSpotifyApi<R extends Route>(route: R, method: Method<R>, params: Params<R, Method<R>>) {
  const result = await fetsClient[route][method]({
    ...params,
    headers: {
      Authorization: `Bearer ${123}`,
    },
  } as any);
  return result;
}

// Route seems correctly typed
type Route = keyof typeof fetsClient;
// Method and Params are probably not
type Method<R extends Route> = keyof typeof fetsClient[R];
type Params<R extends Route, M extends Method<R>> = Omit<Parameters<typeof fetsClient[R][M]>[0], 'headers'>;
