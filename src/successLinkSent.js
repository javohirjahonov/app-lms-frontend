import {CheckCircle} from 'lucide-react';

const SuccessLinkSent = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center">
                <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Check Your Email</h2>
                <p className="text-gray-600 mb-6">
                    We’ve sent a link to your email. Please check your inbox and follow the instructions to proceed.
                </p>
                <div className="flex flex-col gap-3">
                    <button >Go to Homepage</button>
                    <button>Resend Email</button>
                </div>
            </div>
        </div>
    );
}
export default SuccessLinkSent;