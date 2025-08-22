'use client';

import { useEffect, useRef } from 'react';

export const NextIframe = ({ url }: { url: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.onload = function () {
        console.log('iframe loaded');
        const doc =
          iframeRef.current?.contentDocument ||
          iframeRef.current?.contentWindow?.document;
        if (doc && iframeRef.current) {
          iframeRef.current.style.height =
            doc.documentElement.scrollHeight + 'px';
        }
      };
    }
  }, []);

  return (
    <iframe
      ref={iframeRef}
      id="nextpay-iframe"
      src={url}
      frameBorder="0"
      allowFullScreen
      role="presentation"
      allow="payment *; publickey-credentials-get *"
      style={{
        border: '0px',
        margin: '-4px',
        padding: '0px',
        width: 'calc(100% + 8px)',
        minWidth: '100%',
        overflow: 'hidden',
        display: 'block',
        userSelect: 'none',
        transform: 'translate(0px)',
        colorScheme: 'light',
        opacity: '1',
        transition: 'opacity 0.4s 0.1s',
        backgroundColor: 'transparent !important',
      }}
    />
  );
};
