
var apiEndpoint = process.env.NODE_ENV === 'development' ? '/api' : 'https://luxsonic-server.herokuapp.com/api';

export default {
    home: "/",
    dashboard: "/dashboard",
    edit: "/edit",
    server: {
        signIn: apiEndpoint + "/login",
        addRecords: apiEndpoint + "/add-records",
        getRecords: apiEndpoint + "/get-records"
    }
};