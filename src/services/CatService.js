import { API_KEY } from "./_constants";
import axios from "axios";


class CatService {

    async loadData(url, params){
        // console.log('request');

        try{
            axios.defaults.headers.common['x-api-key'] = API_KEY;
    
            let response = await axios.get(url, 
                { params: params
                    // { 
                    //     limit:1, 
                    //     size:"full" 
                    // } 
                } ) // Ask for 1 Image, at full resolution
                            
            return response.data;
        } catch (error) {
            console.log(error.message);
        }
    }
}

export default CatService;