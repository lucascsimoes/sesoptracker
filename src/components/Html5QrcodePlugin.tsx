// file = Html5QrcodePlugin.jsx
import { Html5QrcodeScanner } from 'html5-qrcode';
// import { Html5QrcodeScannerConfig } from 'html5-qrcode/esm/html5-qrcode-scanner';
import { useEffect } from 'react';

const qrcodeRegionId = "html5qr-code-full-region";

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props: any) => {

    let config = {
        fps: 60,
        qrcode: undefined,
        qrbox: 250,
        aspectRatio: 1,
        disableFlip: false,
        showZoomSliderIfSupported: false,
        useBarCodeDetectorIfSupported: false
    };
    if (props.fps) { config.fps = props.fps; }
    if (props.qrbox) { config.qrbox = props.qrbox; }
    if (props.aspectRatio) { config.aspectRatio = props.aspectRatio; }
    if (props.disableFlip !== undefined) { config.disableFlip = props.disableFlip; }
    if (props.showZoomSliderIfSupported !== undefined) { config.showZoomSliderIfSupported = props.showZoomSliderIfSupported; }
    if (props.useBarCodeDetectorIfSupported !== undefined) { config.useBarCodeDetectorIfSupported = props.useBarCodeDetectorIfSupported; }
    return config;
};

const Html5QrcodePlugin = (props: any) => {

    useEffect(() => {
        const config = createConfig(props);
        const verbose = props.verbose === true;

        if (!(props.qrCodeSuccessCallback)) {
            throw "qrCodeSuccessCallback is required callback.";
        }
        
        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
        html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

        return () => {
            html5QrcodeScanner.clear().catch((error: any) => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, []);

    return (
        <div id={qrcodeRegionId} />
    );
};

export default Html5QrcodePlugin;