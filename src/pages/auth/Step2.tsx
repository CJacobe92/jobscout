import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { plan } from '@/services/storage'
import * as z from 'zod'
import PlanSelect from '@/components/select/PlanSelect'
import { useGlobalContext } from '@/context/GlobalContextProvider'
import useTenantSignup from '@/hooks/mutations/useTenantSignup'

const step2Schema = z.object({
  firstname: z.string().min(2, {message: '**First name is required'}).max(50),
  lastname: z.string().min(2, {message: '**First name is required'}).max(20),
  contact_number: z.string().min(8, {message: '**Phone number is required'}),
}) 

const Step2 = () => {

  const subscription = plan.get();
  const { dispatch, data: formData} = useGlobalContext();
  const { mutate } = useTenantSignup();
  const navigate = useNavigate();

  const step2 = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
    defaultValues: formData
  })

  const onSubmit = (values: z.infer<typeof step2Schema>) => {

    if (values) {
      dispatch({
        type: 'ACTION_UPDATE',
        payload: {
          firstname: values.firstname,
          lastname: values.lastname,
          contact_number: values.contact_number,
        }
      })
      mutate({formData})
    }
  }

  
  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen'>
      <div className='space-y-1 text-center'>
        <h1 className='text-2xl font-semibold text-primary'>JobScout</h1>
        <p className='text-xl font-bold text-gray-500'>Sign in to your account</p>
        <p className='text-xs font-semibold text-gray-700'>Already have an account? <Link to={'/signin'} className='text-primary'>Sign in.</Link></p>
      </div>
      <Form {...step2}>
        <form onSubmit={step2.handleSubmit(onSubmit)} className='p-4 w-96'>
          <div className='flex flex-row justify-between w-full my-2'>
            <p className='text-xs font-semibold text-primary'>Principal Information:</p>
            <Link to={'/step1'} className='text-xs font-semibold text-right underline text-primary'>Go Back</Link>
          </div>
          <FormField 
            control={step2.control} 
            name='firstname' 
            render={({field}) => (
            <FormItem>
              <FormLabel className='text-xs text-gray-600'>Firstname</FormLabel>
              <FormControl><Input {...field} className='border border-gray-300 rounded-xs'/></FormControl>
              <FormMessage className='text-xs text-right'/>
            </FormItem>
          )}/>
          <FormField 
            control={step2.control} 
            name='lastname' 
            render={({field}) => (
            <FormItem>
              <FormLabel className='text-xs text-gray-600'>Lastname</FormLabel>
              <FormControl><Input {...field} className='border border-gray-300 rounded-xs'/></FormControl>
              <FormMessage className='text-xs text-right'/>
            </FormItem>
          )}/>
          <FormField 
            control={step2.control} 
            name='contact_number' 
            render={({field}) => (
            <FormItem>
              <FormLabel className='text-xs text-gray-600'>Phone</FormLabel>
              <FormControl><Input {...field} className='border border-gray-300 rounded-xs'/></FormControl>
              <FormMessage className='text-xs text-right'/>
            </FormItem>
          )}/>
          <div className="flex flex-row justify-between w-full">
            <Button type="submit" className='w-full my-4 rounded-xs'>Submit</Button>
          </div>
          <div className='text-xs text-center text-gray-500'>
            <p>By registering, you affirm that all the information provided is accurate to the best of your knowledge. Any instances of fraudulent agencies and POEA licenses will be promptly reported to the appropriate authorities.</p>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Step2