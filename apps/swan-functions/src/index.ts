import * as functions from 'firebase-functions'
import { getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'
import cors from 'cors'
import Stripe from 'stripe'

const corsHandler = cors({ origin: true })

const stripeSecret = functions.config().stripe?.secret

if (!stripeSecret) {
  // Log once at cold start; requests will still fail with 500 below
  console.warn('Stripe secret is not set in functions config. Set with: firebase functions:config:set stripe.secret="sk_live_..."')
}

const stripe = stripeSecret
  ? new Stripe(stripeSecret, {
      apiVersion: '2025-02-24.acacia',
    })
  : null

if (!getApps().length) {
  initializeApp()
}

const db = getFirestore()

type DonationRequest = {
  amount: number
  currency?: string
  email?: string
  name?: string
}

export const createDonationIntent = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== 'POST') {
      res.set('Allow', 'POST')
      return res.status(405).json({ error: 'Method not allowed' })
    }

    let body: DonationRequest | undefined

    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    } catch (parseError) {
      console.error('Invalid JSON payload', parseError)
      return res.status(400).json({ error: 'Invalid JSON body' })
    }

    const { amount, currency = 'usd', email, name } = body ?? {}
    const normalizedAmount = typeof amount === 'number' ? Math.trunc(amount) : NaN

    if (!Number.isInteger(normalizedAmount) || normalizedAmount <= 0) {
      return res.status(400).json({ error: 'Amount must be an integer number of cents greater than zero.' })
    }

    if (!stripe) {
      return res.status(500).json({ error: 'Stripe secret not configured.' })
    }

    try {
      const intent = await stripe.paymentIntents.create({
        amount: normalizedAmount,
        currency,
        automatic_payment_methods: { enabled: true },
        receipt_email: email,
        metadata: {
          donor_name: name ?? '',
        },
      })

      return res.status(200).json({ clientSecret: intent.client_secret })
    } catch (error) {
      console.error('Error creating PaymentIntent', error)
      return res.status(500).json({ error: 'Unable to create payment intent' })
    }
  })
})

type VolunteerRequest = {
  name?: string
  email?: string
  phone?: string
  interests?: string
  message?: string
  honeypot?: string
}

export const submitVolunteer = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== 'POST') {
      res.set('Allow', 'POST')
      return res.status(405).json({ error: 'Method not allowed' })
    }

    let body: VolunteerRequest | undefined
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    } catch (parseError) {
      console.error('Invalid JSON payload', parseError)
      return res.status(400).json({ error: 'Invalid JSON body' })
    }

    const { name, email, phone, interests, message, honeypot } = body ?? {}

    if (honeypot && honeypot.trim().length > 0) {
      return res.status(200).json({ status: 'ok' })
    }

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' })
    }

    if (!db) {
      return res.status(500).json({ error: 'Database not initialized.' })
    }

    try {
      await db.collection('volunteers').add({
        name,
        email,
        phone: phone ?? '',
        interests: interests ?? '',
        message: message ?? '',
        createdAt: Timestamp.now(),
      })

      return res.status(200).json({ status: 'received' })
    } catch (error) {
      console.error('Error saving volunteer submission', error)
      return res.status(500).json({ error: 'Unable to save volunteer submission' })
    }
  })
})
