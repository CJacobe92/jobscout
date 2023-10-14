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

const step1Schema = z.object({
  company_name: z.string().min(2, {message: '**Company name is required'}).max(50),
  company_address: z.string().min(2, {message: '**Company address is required'}).max(20),
  company_email: z.string().email({message: '**Invalid email'}),
  license: z.string().min(2, {message: '**License is required'}).max(15),
  subscription: z.string(),
})

const Step1 = () => {

  const subscription = plan.get();
  const navigate = useNavigate();
  const { dispatch, data } = useGlobalContext();

  const step1 = useForm<z.infer<typeof step1Schema>>({
    resolver: zodResolver(step1Schema),
    defaultValues: data
  })

  const handleNext = (values: z.infer<typeof step1Schema>) => {

    if (values) {
      dispatch({
        type: 'ACTION_UPDATE',
        payload: {
          company_name: values.company_name,
          company_address: values.company_address,
          company_email: values.company_email,
          license: values.license,
          subscription: values.subscription
        }
      })
    }
 
    navigate('/step2')
  }



  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen'>
      <div className='mb-6 space-y-1 text-center'>
        <h1 className='text-2xl font-semibold text-primary'>JobScout</h1>
        <p className='text-xl font-bold text-gray-500'>Create a Tenant Account</p>
        <p className='text-xs font-semibold text-gray-700'>Already have an account? <Link to={'/signin'} className='text-primary'>Sign in.</Link></p>
      </div>
      <PlanSelect subscription={subscription}/>
        <Form {...step1}>
          <form onSubmit={step1.handleSubmit(handleNext)} className='p-4 w-96'>
            <p className='my-2 text-xs font-semibold text-primary'>Company Information:</p>
              <FormField control={step1.control} 
                name='company_name' 
                render={({field}) => (
                <FormItem>
                  <FormLabel className='text-xs text-gray-600'>Company Name</FormLabel>
                  <FormControl><Input {...field} className='border border-gray-300 rounded-xs'/></FormControl>
                  <FormMessage className='text-xs text-right'/>
                </FormItem>
              )}/>
              <FormField 
                control={step1.control} 
                name='company_address' 
                render={({field}) => (
                <FormItem>
                  <FormLabel className='text-xs text-gray-600'>Company Address</FormLabel>
                  <FormControl><Input {...field} className='border border-gray-300 rounded-xs'/></FormControl>
                  <FormMessage className='text-xs text-right'/>
                </FormItem>
              )}/>
              <FormField 
                control={step1.control} 
                name='company_email' 
                render={({field}) => (
                <FormItem>
                  <FormLabel className='text-xs text-gray-600'>Email</FormLabel>
                  <FormControl><Input {...field} className='border border-gray-300 rounded-xs'/></FormControl>
                  <FormMessage className='text-xs text-right'/>
                </FormItem>
              )}/>
              <FormField 
                control={step1.control} 
                name='license' 
                render={({field}) => (
                <FormItem>
                  <FormLabel className='text-xs text-gray-600'>POEA License</FormLabel>
                  <FormControl><Input {...field} className='border border-gray-300 rounded-xs'/></FormControl>
                  <FormMessage className='text-xs text-right'/>
                </FormItem>
              )}/>
            <div className="w-full text-right">
              <Button type="submit" className='w-full my-4 rounded-xs'>NEXT</Button>
            </div>
            <div className='text-xs text-center text-gray-500'>
              <p>By registering, you affirm that all the information provided is accurate to the best of your knowledge. Any instances of fraudulent agencies and POEA licenses will be promptly reported to the appropriate authorities.</p>
            </div>
        </form>
      </Form>
    </div>
  )
}

export default Step1