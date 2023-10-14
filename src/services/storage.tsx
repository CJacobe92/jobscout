type User = {
  id: string,
  firstname: string,
  lastname: string,
  email: string,
}

export const plan = {
  set: (payload: string) => {localStorage.setItem('plan', JSON.stringify(payload))},
  get: (): string => JSON.parse(localStorage.getItem('plan') || ''),
  remove: () => localStorage.removeItem('plan')
}

export const role = {
  set: (payload: string) => {localStorage.setItem('role', JSON.stringify(payload))},
  get: (): string => JSON.parse(localStorage.getItem('role') || ''),
  remove: () => localStorage.removeItem('role'),
}

export const verified = {
  set: (payload: string) => {localStorage.setItem('verified', JSON.stringify(payload))},
  get: (): string => JSON.parse(localStorage.getItem('verified') || ''),
  remove: () => localStorage.removeItem('verified'),
}

export const user = {
  set: (payload: User) => {localStorage.setItem('traits', JSON.stringify(payload))},
  get: (): User => JSON.parse(localStorage.getItem('traits') || ''),
  remove: () => localStorage.removeItem('traits'),
}

export const tenant = {
  set: (payload: string) => {localStorage.setItem('tenantId', JSON.stringify(payload))},
  get: ():string => JSON.parse(localStorage.getItem('tenantId') || ''),
  remove: () => localStorage.removeItem('tenantId'),
}

export const auth = {
  set: (payload: string) => {localStorage.setItem('auth', JSON.stringify(payload))},
  get: () => JSON.parse(localStorage.getItem('auth') || ''),
  remove: () => localStorage.removeItem('auth'),
}



// export const userSettings = {

//    initialSettings: {
//     assignedTable: true,
//     unassignedTable: true,
//     clientsTable: true,
//     employeesTable: true
//   },

//   set: () => {localStorage.setItem('userSettings', JSON.stringify(userSettings.initialSettings))},
//   get: () => JSON.parse(localStorage.getItem('userSettings')),
//   remove: () => localStorage.removeItem('userSettings'),
//   update: (propertyName, value) => {
//     const currentSettings = userSettings.get();
//     currentSettings[propertyName] = value;
//     localStorage.setItem('userSettings', JSON.stringify(currentSettings));
//   },
// }