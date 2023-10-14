import { API } from '@/services/AxiosInstance';
import { useMutation } from '@tanstack/react-query'

type Variables = {
  password: string;
  token: string
}

type ResponseData = {
  uid: string,
  accessToken: string,
  enabled: string,
  otp_enabled: string,
  otp_required: string,
  role: string,
  tenant_id: string
}

const usePassword = () => {

  const postData = async (variables: Variables) => {
    try{
      const payload = { password: variables.password}
      const url = `/auth/password?token=${variables.token}`
      const res = await API.post(url, { auth: payload })

      if (res.status == 200 || res.status == 204) {

        const data: ResponseData = {
          uid: res?.headers.uid,
          accessToken: res?.headers.authorization,
          enabled: res?.headers.enabled,
          otp_enabled: res?.headers.otp_enabled,
          otp_required: res?.headers.otp_required,
          role: res?.headers.role,
          tenant_id: res?.headers.tenant_id
        }
        return data
      }
    } catch(error){
      throw new Error('An error occured while processing this request')
    }
  }

  return useMutation({
    mutationKey: ['password'],
    mutationFn: postData,
    onMutate: (variables: Variables) => variables
  })
}

export default usePassword