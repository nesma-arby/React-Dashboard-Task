
import { ACCEPT_SCHOOL, REJECT_SCHOOL, RECIEVE_SCHOOLS_DATA } from '../action-types';
import axios from 'axios';

/* let's define the 3 types of our status */
let pending = [];
let accepted = [];
let rejected = [];

export const receive_schools_data = (pending, accepted, rejected) => {
    const action = {
        type: RECIEVE_SCHOOLS_DATA,
        pending,
        accepted,
        rejected
    }
    return action;
}


// Use this function to delete all the data in the APIs (for testing)
// export function delete_api(data) {
//     data.map((d) => {
//         axios.delete(`http://localhost:3000/api/Schools/${d.id}`)
//             .then(res => {
//                 console.log('Success in deleting data', res);
//             }).catch(error => console.log('Error in deleting data', error))
//     })
// }


export function loadData() {
    return (dispatch) => {
        return axios.get('http://localhost:3000/api/Schools')
            .then((response) => {
                response.data.map(res => {
                    if (res.status === 'pending') {
                        pending.push(res)
                    } else if (res.status === 'accepted') {
                        accepted.push(res)
                    } else if (res.status === 'rejected') {
                        rejected.push(res)
                    }
                }
                )
                dispatch(receive_schools_data(pending, accepted, rejected));

                // call it to delete data just for testing
                // delete_api(response.data);

            }).catch(err => console.log('Error in loading data : ', err))
    }
}


export const accept = (selectedSchool) => {
    const action = {
        type: ACCEPT_SCHOOL,
        selectedSchool
    }
    return action;
}

export const reject = (selectedSchool) => {
    const action = {
        type: REJECT_SCHOOL,
        selectedSchool
    }
    return action;
}