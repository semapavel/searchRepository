import axios from "axios";
import { setIsFetching, setFetchError, setRepos, setNullPage } from "../../reducers/reposreducer";

export const getRepos = (searchQuery = "stars:%3E1", currentPage, perPage) => {
	if( searchQuery == "") {
		searchQuery = "stars:%3E1"

	}

	return async(dispatch) => {
		try {
			dispatch(setIsFetching(true))
			const response = await axios.get(`https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&per_page=${perPage}&page=${currentPage}`)
			dispatch(setRepos(response.data))
		} catch (e){
			dispatch(setIsFetching(false))
			dispatch(setFetchError(true))
			
			setTimeout(()=>{
				dispatch(setFetchError(false))
			}, 2000)
		}
	}


}