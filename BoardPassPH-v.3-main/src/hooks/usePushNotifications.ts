import { useState } from 'react';

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const output = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) output[i] = rawData.charCodeAt(i);
  return output;
}

export function usePushNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>(() =>
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'denied'
  );
  const [subscribed, setSubscribed] = useState(() =>
    typeof window !== 'undefined' && localStorage.getItem('bp_push_subscribed') === '1'
  );
  const [requesting, setRequesting] = useState(false);

  const subscribe = async (email: string) => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('PushManager' in window)) return;
    setRequesting(true);
    try {
      const perm = await Notification.requestPermission();
      setPermission(perm);
      if (perm !== 'granted') return;

      const reg = await navigator.serviceWorker.ready;
      const res = await fetch(`/api/push/vapidPublicKey`);
      const { publicKey } = await res.json();

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        // @ts-ignore - TypeScript works at runtime with this ArrayBuffer like conversion
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });

      await fetch(`/api/push/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, subscription: sub.toJSON() }),
      });

      localStorage.setItem('bp_push_subscribed', '1');
      setSubscribed(true);
    } catch (err) {
      console.error('Push subscription failed', err);
    } finally {
      setRequesting(false);
    }
  };

  const dismissBanner = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bp_push_dismissed', '1');
    }
  };

  const isBannerDismissed = typeof window !== 'undefined' && localStorage.getItem('bp_push_dismissed') === '1';

  return { permission, subscribed, requesting, subscribe, dismissBanner, isBannerDismissed };
}
