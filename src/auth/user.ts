export interface User {
    aud: string,
    auth_time: number,
    sub: string,
    iat: number,
    exp: number,
    email: string,
    email_verified: boolean,
    firebase: any,
    uid: string
}