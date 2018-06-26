/**
 * Created by sensen on 2017-07-05.
 */
export default function (state=null, action) {
    switch (action.type) {
        case "SELECTED_BOOK": {
            return action.payload;
        }
    }
    return state;
}