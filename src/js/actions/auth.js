import Flux from '@4geeksacademy/react-flux-dash';
import {Session} from 'bc-react-session';
import BC from '../utils/api.js';

BC.setOptions({
    getToken: (type='api')=> {
        const session = Session.get();
        return 'Bearer '+session.payload.access_token;
    },
    onLogout: () => logout()
});

export const login = (username, password, history) =>{
    return BC.credentials().autenticate(username, password)
    .then((data) => {
        
        const user = {
            bc_id: data.id,
            wp_id: data.wp_id,
            access_token: data.access_token,
            bio: data.bio,
            cohorts: data.cohorts,
            currently_active: data.currently_active,
            total_points: data.total_points,
            financial_status: data.financial_status,
            avatar: data.avatar_url,
            phone: data.phone,
            github: data.github,
            email: data.email || data.username,
            created_at: data.created_at,
            full_name: data.full_name,
            type: data.type || 'student',
            currentCohort: (data.cohorts.length === 1) ? data.cohorts[0] : data.cohorts
        };
        Session.start({ payload: user, expiration: (3600*24) });
        history.push('/');
    });
};
    
export const logout = (history=null) => {
    Session.destroy();
    if(history) history.push('/login');
    else window.location.href= "/login";
};
    
export const remind = (email) =>{
    return BC.credentials().remind(email)
    .then((data) => {
        return data;
    });
};