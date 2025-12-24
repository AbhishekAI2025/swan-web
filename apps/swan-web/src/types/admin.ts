export type AdminDonation = {
  id: string
  amount: number
  currency?: string
  email?: string
  createdAt?: string
}

export type AdminVolunteer = {
  id: string
  name: string
  email: string
  phone?: string
  interests?: string
  message?: string
  createdAt?: string
}

export type AdminContact = {
  id: string
  name: string
  email: string
  message?: string
  createdAt?: string
}
