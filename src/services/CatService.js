import { API_KEY, BASE_URL, IMAGES } from "./_constants";
import axios from "axios";


class CatService {

    async loadData(params){
        console.log('request');

        try{
            axios.defaults.headers.common['x-api-key'] = API_KEY;
    
            let response = await axios.get('https://api.thecatapi.com/v1/images/search', 
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