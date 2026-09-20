import { PaymentInitiationParams, PaymentRecord, PaymentProvider } from '@/types/payment';

export class PaymentService {
  private provider: PaymentProvider;

  constructor() {
    this.provider = (process.env.NEXT_PUBLIC_PAYMENT_PROVIDER as PaymentProvider) || 'demo';
  }

  public getProvider(): PaymentProvider {
    return this.provider;
  }

  /**
   * Process a payment transaction. In Phase 1/MVP, simulates a safe demo transaction
   * with explicit demo feedback.
   */
  public async processPayment(params: PaymentInitiationParams, userId: string): Promise<PaymentRecord> {
    // Artificial latency for realistic async interaction
    await new Promise((resolve) => setTimeout(resolve, 800));

    const record: PaymentRecord = {
      id: `pay_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      user_id: userId,
      type: params.type,
      amount: params.amount,
      currency: params.currency || 'INR',
      status: 'success',
      provider: this.provider,
      reference_id: `DEMO-REF-${Math.floor(100000 + Math.random() * 900000)}`,
      metadata: params.metadata,
      created_at: new Date().toISOString(),
    };

    return record;
  }
}

export const paymentService = new PaymentService();
