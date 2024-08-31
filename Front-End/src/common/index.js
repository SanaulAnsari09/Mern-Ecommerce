
const backendDomain = "http://localhost/8000";

const SummaryApi = {
    signup:{
        url:`${backendDomain}/api/signup`,
        method:"post"
    },
    signin:{
        url:`${backendDomain}/api/signin`,
        method:"post"
    },
};

export default SummaryApi;