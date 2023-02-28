import axios from "axios";


class CatService {

    static async loadData(url, params){
        try{
            axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_API_KEY;
    
            let response = await axios.get(url, 
                { params: params } ) // Ask for 1 Image, at full resolution
            return response.data;
        } catch (error) {
            console.error(error.message);
        }
    }

    static async postData(url, imageId, user) {
        try {
            return axios.post(url, {
                image_id: imageId,
                sub_id: user
            })
        }catch (error) {
            console.error(error.message);
        }
    }

    static async deleteData(url, imageId) {
        try {
            return axios.delete(url + '/' + imageId)
        }catch (error) {
            console.error(error.message);
        }
    }
}

export default CatService;