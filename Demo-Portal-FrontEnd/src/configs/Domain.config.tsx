export const getDomain = ()=>{
    // const userDetails = JSON.parse(localStorage.getItem('user') as string)
    return {
        common_url:import.meta.env.VITE_APP_COMMON_URL
    }
}