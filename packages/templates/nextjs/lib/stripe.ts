import Stripe from 'stripe';

let _stripe: Stripe | null = null;
export const getStripe = (): Stripe => {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      
    });
  }
  return _stripe;
};

type Product = Stripe.Product

export const getProducts = async ({ baseUrl }: { baseUrl?: string }): Promise<Product[]> => {
  try {
    const response = await fetch(`${baseUrl}/api/products`)

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export const getProduct = async ({ baseUrl, product_id }: { baseUrl?: string, product_id: string }): Promise<Product> => {
  try {
    const response = await fetch(`${baseUrl}/api/product?product_id=${product_id}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

export const getCustomer = async ({ baseUrl, customer_id }: { baseUrl?: string, customer_id: string }): Promise<Stripe.Customer> => {
  try {
    const response = await fetch(`${baseUrl}/api/customer?customer_id=${customer_id}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch customer: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching customer:', error)
    throw error
  }
}

export const getCustomerSubscriptions = async ({ baseUrl, customer_id }: { baseUrl?: string, customer_id: string }): Promise<Stripe.Response<Stripe.ApiList<Stripe.Subscription>>[]> => {
  try {
    const response = await fetch(`${baseUrl}/api/customer/subscriptions?customer_id=${customer_id}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch customer subscriptions: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching customer subscriptions:', error)
    throw error
  }
}

export const getCustomerPayments = async ({ baseUrl, customer_id }: { baseUrl?: string, customer_id: string }): Promise<Stripe.Response<Stripe.ApiList<Stripe.PaymentIntent>>[]> => {
  try {
    const response = await fetch(`${baseUrl}/api/customer/payments?customer_id=${customer_id}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch customer payments: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching customer payments:', error)
    throw error
  }
}

export const createCustomer = async ({ baseUrl, customer }: { baseUrl?: string, customer: Stripe.CustomerCreateParams }): Promise<Stripe.Response<Stripe.Customer>> => {
  try {
    const response = await fetch(`${baseUrl}/api/customer`, {
      method: 'POST',
      body: JSON.stringify(customer),
    })

    if (!response.ok) {
      throw new Error(`Failed to create customer: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating customer:', error)
    throw error
  }
}

export const updateCustomer = async ({ baseUrl, customer_id, customer }: { baseUrl?: string, customer_id: string, customer: Stripe.CustomerUpdateParams }): Promise<Stripe.Response<Stripe.Customer>> => {
  try {
    const response = await fetch(`${baseUrl}/api/customer?customer_id=${customer_id}`, {
      method: 'PUT',
      body: JSON.stringify(customer),
    })

    if (!response.ok) {
      throw new Error(`Failed to update customer: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error updating customer:', error)
    throw error
  }
}

export const checkout = async ({ baseUrl, productCart, customer, billing_address, return_url, customMetadata }: { baseUrl?: string, productCart: Array<{ product_id: string; quantity: number; amount?: number }>, customer: Stripe.Customer, billing_address: Stripe.Address, return_url: string, customMetadata?: Record<string, string> }) => {
  try {
    const response = await fetch(`${baseUrl}/api/checkout`, {
      method: 'POST',
      body: JSON.stringify({ productCart, customer, billing_address, return_url, customMetadata }),
    })

    if (!response.ok) {
      throw new Error(`Failed to checkout: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error checking out:', error)
    throw error
  }
}