import {ADD_ONE_DRIVE_TOKEN} from "./types";

export function oneDriveAddToken(token, expiry) {
    return {
        type: ADD_ONE_DRIVE_TOKEN,
        payload: {token, expiry}
    }
}