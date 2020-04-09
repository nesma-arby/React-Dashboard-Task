
import { ACCEPT_SCHOOL, REJECT_SCHOOL, RECIEVE_SCHOOLS_DATA } from '../action-types';
import axios from 'axios';

const intialState = {
    pending: [],
    accepted: [],
    rejected: [],
}


const reducer = (state = intialState, action) => {


    /* Change school status from pending to accepted or rejected and update the state */
    function change_school_status(school) {
        state.pending = state.pending.filter(p => { return p.id !== school.id })

        if (school.status === 'accepted') {
            state.accepted.push(school);
        } else if (school.status === 'rejected') {
            state.rejected.push(school);
        }
    }

    // For first load
    if (action.type === RECIEVE_SCHOOLS_DATA) {
        return {
            ...state,
            pending: action.pending,
            accepted: action.accepted,
            rejected: action.rejected
        }
    }


    // Accept school
    else if (action.type === ACCEPT_SCHOOL) {
        let school = action.selectedSchool;
        school.status = 'accepted';

        axios.request({
            method: 'put',
            url: `http://localhost:3000/api/Schools/${school.id}`,
            data: school
        }).then(
            change_school_status(school)
        ).catch( error => console.log('Error accepting school', error) )
        return {
            ...state
        }
    }


    // Reject school
    else if (action.type === REJECT_SCHOOL) {
        let school = action.selectedSchool;
        school.status = 'rejected';
        axios.request({
            method: 'put',
            url: `http://localhost:3000/api/Schools/${school.id}`,
            data: school
        }).then(
            change_school_status(school)
        ).catch( error => console.log('Error rejecting school', error) )
        return {
            ...state
        }
    }

    else {
        return state;
    }


}


export default reducer;