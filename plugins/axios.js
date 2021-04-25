
import qs from "qs";

export default function({req, $axios, redirect }) {
    $axios.onRequest(config => {
        // console.log('Making request to ' + config.url)
        
    })

    $axios.onResponse(response => {
        // console.log(response)
    })
  
    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        console.log(error)
        // if (code === 400 || code === 500) {
        //     redirect('/')
        // }
    })
}
