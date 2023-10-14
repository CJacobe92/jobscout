import { API } from '@/services/AxiosInstance';
import { useMutation } from '@tanstack/react-query'

type Variables = {
  credentials: string;
}

type ResponseData = {
  role: string,
  token: string,
  username: string,
}

const useCredentials = () => {

  const postData = async (variables: Variables) => {
    try{
      const payload = { auth: variables}
      const url = '/auth/credentials'
      const res = await API.post(url, payload)

      if (res.status == 200 || res.status == 204) {

        const data: ResponseData = {
          role: res?.headers.role,
          token: res?.headers.authorization,
          username: res?.data.account
        }
        return data
      }
    } catch(error){
      throw new Error('An error occured while processing this request')
    }
  }

  return useMutation({
    mutationKey: ['credentials'],
    mutationFn: postData,
    onMutate: (variables: Variables) => variables
  })
}

export default useCredentials