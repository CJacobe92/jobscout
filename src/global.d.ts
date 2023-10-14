import 'little-state-machine';

declare module 'little-state-machine' {
  interface GlobalState {
    data: {
      company_name: string,
      company_address: string,
      company_email: string,
      license: string,
      firstname: string,
      lastname: string,
      contact_number: string,
      subscription: string
    },
  }
}