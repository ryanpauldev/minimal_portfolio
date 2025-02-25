---
title: "Implementing Clover Payment SDK"
description: "A step-by-step guide for integrating Clover's iframe and SDK API into a Next.js application."
date: "Feb 25 2024"
draft: false
---

## Overview

This guide walks through implementing Clover's payment system in a Next.js application, focusing on secure iframe integration and SDK usage. I used this implementation when creating [Gabby's GOATS](../projects/gabbys_goats).

### Prerequisites

- Next.js project
- Clover Developer Account
- Environment Variables:
  - `NEXT_PUBLIC_CLOVER_API_KEY`
  - `NEXT_PUBLIC_CLOVER_MERCHANT_ID`
  - `CLOVER_PRIVATE_KEY`

## Implementation Steps

### 1. Environment Setup

```bash
# Add to .env.local
NEXT_PUBLIC_CLOVER_API_KEY=your_public_key
NEXT_PUBLIC_CLOVER_MERCHANT_ID=your_merchant_id
CLOVER_PRIVATE_KEY=your_private_key
```

### 2. Type Definitions

```typescript
// Add to your component file
interface CloverElement {
  destroy: () => void;
  mount: (selector: string) => void;
  addEventListener: (event: string, callback: (event: any) => void) => void;
}

interface CloverElements {
  [key: string]: CloverElement;
}

interface CloverEvent {
  error?: {
    message: string;
  };
  complete: boolean;
  empty: boolean;
}

interface CloverTokenResult {
  token: string;
  errors?: {
    [key: string]: string;
  };
}
```

### 3. Component State Setup

```typescript
const Donate: React.FC = () => {
  const cloverInitialized = useRef(false);
  const cloverInstance = useRef<any>(null);
  const cloverElements = useRef<CloverElements>({});
  const [amount, setAmount] = useState<number>(10);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState<{
    amount: number;
    transactionId: string;
    date: string;
  } | null>(null);
```

### 4. SDK Integration

```typescript
useEffect(() => {
  if (cloverInitialized.current) return;

  const script = document.createElement('script');
  script.src = 'https://checkout.clover.com/sdk.js';
  script.async = true;

  script.onload = () => {
    if (window.Clover) {
      initializeClover();
      cloverInitialized.current = true;
    }
  };

  document.head.appendChild(script);
  return cleanup;
}, []);
```

### 5. Clover Initialization

```typescript
const initializeClover = () => {
  const apiKey = process.env.NEXT_PUBLIC_CLOVER_API_KEY;
  const merchantId = process.env.NEXT_PUBLIC_CLOVER_MERCHANT_ID;

  const clover = new window.Clover(apiKey, {
    merchantId: merchantId,
    environment: 'production',
    baseUrl: 'https://token.clover.com',
    targetOrigin: 'https://checkout.clover.com',
    cors: true
  });

  cloverInstance.current = clover;
  const elements = clover.elements();

  // Create and mount elements
  cloverElements.current = {
    number: elements.create('CARD_NUMBER'),
    date: elements.create('CARD_DATE'),
    cvv: elements.create('CARD_CVV'),
    postal: elements.create('CARD_POSTAL_CODE')
  };
};
```

### 6. Payment Processing

```typescript
const processPayment = async (token: string) => {
  try {
    const response = await axios.post('/api/process-payment', {
      token,
      amount: amount * 100 // Convert to cents
    });
    
    if (response.data.message === 'Payment successful') {
      setIsSuccess(true);
      setTransactionDetails({
        amount: amount,
        transactionId: response.data.id,
        date: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Payment processing error:', error);
  }
};
```

### 7. API Route Handler

```typescript
// pages/api/process-payment.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await axios.post('https://checkout.clover.com/sdk.js', {
      source: req.body.token,
      amount: req.body.amount,
      currency: 'usd',
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.CLOVER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json({ message: 'Payment successful', data: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Payment failed' });
  }
}
```

## Cleanup and Best Practices

- Always clean up Clover elements when unmounting
- Handle errors gracefully
- Validate amounts before processing
- Implement proper loading states
- Use proper TypeScript types

## Common Issues

1. Iframe not mounting properly
   - Solution: Ensure container elements exist before mounting
2. SDK loading issues
   - Solution: Implement proper error handling and retry logic
3. CORS issues
   - Solution: Configure proper headers and origins

## Testing

- Test with various amount inputs
- Verify error handling
- Check mobile responsiveness
- Use Clover's test card numbers
- Verify successful transaction flow

🔒 Remember to always follow security best practices when handling payments!