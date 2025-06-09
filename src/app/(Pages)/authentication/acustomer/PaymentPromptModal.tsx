import React, { useState, useEffect } from 'react';

interface PaymentPromptModalProps {
  reqLoading: boolean;
}

const PaymentPromptModal: React.FC<PaymentPromptModalProps> = ({ reqLoading }) => {
  const [step, setStep] = useState<number>(1);
  const [countdown, setCountdown] = useState<number>(25);

  useEffect(() => {
    let transitionTimeout: NodeJS.Timeout;

    if (reqLoading) {
      setStep(1);
      setCountdown(25);
      transitionTimeout = setTimeout(() => {
        setStep(2);
      }, 3000);
    }

    return () => clearTimeout(transitionTimeout);
  }, [reqLoading]);

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;

    if (reqLoading && step === 2) {
      countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(countdownInterval);
  }, [reqLoading, step]);

  if (!reqLoading) return null;

  // Calculate progress percentage for bar
  const progressPercent = (countdown / 25) * 100;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 font-bold bg-light-success">
      <div className="bg-black bg-opacity-30 absolute inset-0" />
      <div className="relative z-10 bg-white rounded-xl shadow-xl p-6 w-full max-w-sm text-center">
        <div className="flex justify-center mb-4">
          <div className="animate-spin h-6 w-6 border-4 border-fuchsia-600 border-t-transparent rounded-full" />
        </div>
        <h2 className="text-lg font-semibold">
          {step === 1
            ? '⏳ Sending Payment Prompt to Your Phone...'
            : '📲 Prompt Sent!'}
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          {step === 1
            ? 'Please keep your phone nearby. You’ll receive an M-Pesa prompt shortly. Be ready to enter your PIN to authorize the payment.'
            : 'Check your phone now for an M-Pesa prompt. When it appears, enter your M-Pesa PIN to complete your payment.'}
        </p>

        {step === 2 && (
          <>
            <p className="mt-4 text-sm font-medium text-gray-800">
              ⏱ {countdown}s remaining
            </p>
            <div className="w-100 bg-light-success rounded-pill h-2 mt-3 overflow-hidden">
              <div
                className="h-100 bg-primary rounded-pill transition-all"
                style={{ width: `${progressPercent}%`, transition: 'width 0.5s ease-in-out' }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentPromptModal;
