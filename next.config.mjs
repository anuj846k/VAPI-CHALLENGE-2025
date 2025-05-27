/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        VAPI_WEB_TOKEN: process.env.VAPI_WEB_TOKEN,
        VAPI_ASSISTANT_ID: process.env.VAPI_ASSISTANT_ID,
        // NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    },
};

export default nextConfig;
