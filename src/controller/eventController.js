import response from '../util/response/response'
import flag from '../util/flag/errorCode'
// import Event from '../models/Event';

export const listEvent =  async (req, res, next) => {
    try {
        console.log("oi");
        // const data = Event.findAll({raw: true})
        // .then((data) => {
        //     console.log("data: ", data.json());
        //     console.log("data: ", data[0].name);
        //     response.success('get event list is success', res, data)
        // })
        // .catch((err) => {
        //     console.log("err: ", err);
        // })
        // const data = await Event.findAll({raw: true})
        // console.log("data: ", data[0].name);
        // if (!data) return response.error(`No user found`, res, flag.event_not_found)
        // response.success('get event list is success', res, data)
        response.success('get event list is success', res, {})
    } catch (error) {
        console.log("error: ", error);
    }
}