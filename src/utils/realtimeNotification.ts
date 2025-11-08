type RealtimeNotificationType = 'follow' | 'like' | 'comment';

interface RealtimeNotificationOptions {
  type: RealtimeNotificationType;
  message: string;
  duration?: number;
  avatarUrl?: string;
}

export const showRealtimeNotification = ({
  type,
  message,
  duration = 4000,
  avatarUrl,
}: RealtimeNotificationOptions) => {
  let container = document.getElementById('realtime-notification-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'realtime-notification-container';
    container.className =
      'fixed bottom-5 right-5 flex flex-col gap-3 z-[9999] pointer-events-none';
    document.body.appendChild(container);
  }

  const notification = document.createElement('div');
  notification.className = `
    bg-white rounded-xl shadow-lg border border-gray-200 p-3
    flex items-center gap-3 w-[280px] pointer-events-auto
    animate-slideInRealtime transition-all duration-300
  `;

  // Avatar
  const avatar = document.createElement('img');
  avatar.src =
    avatarUrl ||
    'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  avatar.alt = 'avatar';
  avatar.className = 'w-10 h-10 rounded-full object-cover flex-shrink-0';

  // Message
  const msg = document.createElement('div');
  msg.className = 'text-gray-800 text-sm leading-snug';
  msg.innerHTML = message;

  notification.appendChild(avatar);
  notification.appendChild(msg);

  container.appendChild(notification);

  // Tự động biến mất
  setTimeout(() => {
    notification.classList.add('animate-slideOutRealtime');
    notification.addEventListener('animationend', () => {
      notification.remove();
    });
  }, duration);
};
