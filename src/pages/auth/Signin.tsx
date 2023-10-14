import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import useCredentials from '@/hooks/mutations/useCredentials'

const formSchema = z.object({
  credentials: z.string().min(2, {
    message: 'Username or Email must be atleast 8 characters'
  })
})

const Signin = () => {

  const { mutate } = useCredentials();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      credentials: ""
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate({credentials: data.credentials}, {
      onSuccess: (data) => {
        navigate(`/password?type=${data?.role}&username=${data?.username}&token=${data?.token}`);
      }
    })
  }

  return (
    <div className='flex items-center justify-center w-full min-h-screen'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='p-4 space-y-6 rounded-md w-96'>
          <div className='mt-4 space-y-2 text-center'>
            <h1 className='text-2xl font-bold text-primary'>JobScout</h1>
            <p className='text-xl font-semibold text-gray-600'>Sign in to your account</p>
            <span className='text-xs font-semibold text-gray-700'>Don't have an account? <Link to={'/signup'}>Sign up.</Link></span>
          </div>
          <FormField 
            control={form.control}
            name='credentials'
            render={({field}) => (
              <FormItem>
                <FormLabel className='text-gray-600'>Credentials</FormLabel>
                <FormControl>
                  <Input placeholder='user@jobscout.com | username92' {...field} className='rounded-sm'/>
                </FormControl>
                <FormDescription>
                  Enter your username or email
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='w-full text-right'>
            <Button type='submit' className='w-full text-sm rounded-sm primary'>NEXT</Button>
          </div>
          <p className='text-xs font-semibold text-center text-gray-700'>
            "By signing in, you agree to our privacy policy and terms of service."
          </p>
        </form>
      </Form>
    </div>
  )
}

export default Signin