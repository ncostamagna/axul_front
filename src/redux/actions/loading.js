import {
    LOADING
} from '../types';

export function loading(loading) {
    return async (dispatch) => {
        dispatch( setLoading(loading))
    }
}

const setLoading = (loading) => ({
    type: LOADING,
    payload: {loading}
});
