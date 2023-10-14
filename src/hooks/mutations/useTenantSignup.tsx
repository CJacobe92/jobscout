import { API } from '@/services/AxiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

type Variables = {
  formData: {
    company_name: string,
    company_address: string,
    company_email: string,
    license: string,
    firstname: string,
    lastname: string,
    contact_number: string,
    subscription: string
  }
}

type ResponseData = {
  message: string
}

const useTenantSignup = () => {

  const postData = async (variables: Variables) => {
    try{

      const res = await API.post('/tenants', {tenant: variables.formData})

      if (res.status == 200 || res.status == 204) {
        return res?.data as ResponseData
      }
    } catch(err){
      throw new Error('An error occured while processing this request')
    }
  }

  return useMutation({
    mutationKey: ['tenantSignup'],
    mutationFn: postData,
    onMutate: variables => variables
  })
}

export default useTenantSignup