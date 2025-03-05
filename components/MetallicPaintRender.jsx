'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import logo from the public folder
const logoUrl = "/zeej3.svg";

// Dynamically import MetallicPaint with no SSR
const MetallicPaint = dynamic(() => import("./ui/MetallicPaint"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center"></div>
    ),
});

const MetallicPaintRender = () => {
    const [isClient, setIsClient] = useState(false);
    const [imageData, setImageData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        async function loadDefaultImage() {
            try {
                console.log("Attempting to fetch:", logoUrl);
                const response = await fetch(logoUrl);
                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
                }

                const blob = await response.blob();
                console.log("Blob size:", blob.size, "Blob type:", blob.type);

                // Create file from blob
                const file = new File([blob], 'default.svg', { type: 'image/svg+xml' });
                console.log("File created successfully");

                // Dynamically import parseLogoImage only when needed
                const { parseLogoImage } = await import("./ui/MetallicPaint");
                const result = await parseLogoImage(file);
                console.log("Parse result:", result);

                if (!result || !result.imageData) {
                    throw new Error("Failed to parse logo image");
                }

                setImageData(result.imageData);
                setError(null);
            } catch (err) {
                console.error("Error in loadDefaultImage:", err);
                setError(err.message);
            }
        }

        loadDefaultImage();
    }, [isClient]);

    if (!isClient) return <div className="w-full h-full"></div>;
    if (error) return <div className="w-full h-full"></div>;

    return (
        <div style={{
            width: '100%',
            height: '100vh',
            background: 'black',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {imageData ? (
                <div style={{
                    width: '70%',
                    height: '70%',
                    maxWidth: '1000px',
                    maxHeight: '1000px'
                }}>
                    <MetallicPaint
                        imageData={imageData}
                        params={{
                            edge: 2,
                            patternBlur: 0.03,
                            patternScale: 5,
                            refraction: 0.05,
                            speed: 0.4,
                            liquid: 0.07
                        }}
                    />
                </div>
            ) : (
                <div className="w-full h-full"></div>
            )}
        </div>
    );
};

export default MetallicPaintRender;
