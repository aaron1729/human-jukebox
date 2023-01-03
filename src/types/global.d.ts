export {};

declare global {



    // in comparison with privateMusicianInfo, this is (purposely) missing: access, handle, and spotify_id
    type UpdateObj = {
        bio?: string
        display_name?: string,
        instagram?: string,
        instagram_show?: boolean,
        spotify_playlist_id?: string,
        spotify_playlist_name?: string,
        spotify_playlist_url?: string,
        venmo?: string,
        venmo_show?: boolean
      };

    // for musician private page; this is a subset of the keys in an object of type UpdateObj
    type SmallTextField = 'display_name' | 'instagram' | 'venmo';
    type LargeTextField = 'bio'

}