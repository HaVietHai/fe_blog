export const showCenterNotification = ({
  title = '🎉 Chúc mừng!',
  message = 'Bạn đã tạo tài khoản thành công!',
  duration = 5000,
  onClick,
}: {
  title?: string;
  message?: string;
  duration?: number;
  onClick?: () => void;
}) => {
  // Xóa thông báo cũ nếu có
  const existing = document.getElementById('center-notification');
  if (existing) existing.remove();

  const container = document.createElement('div');
  container.id = 'center-notification';
  container.className =
    'fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-[9999] animate-fadeInCenter';
  document.body.appendChild(container);

  const box = document.createElement('div');
  box.className =
    'bg-white p-6 rounded-2xl shadow-2xl text-center w-[320px] animate-popIn relative';

  box.innerHTML = `
    <h2 class="text-2xl font-semibold text-gray-800 mb-2">${title}</h2>
    <p class="text-gray-600 text-sm mb-5">${message}</p>
    <button id="center-next-btn" class="transition-all duration-300 bg-cyan-500 text-white px-5 py-2.5 rounded-full flex items-center justify-center gap-2 mx-auto hover:bg-cyan-600">
      <span class="icon transition-transform duration-300 text-lg">➤</span>
    </button>
  `;

  container.appendChild(box);

  const btn = box.querySelector('#center-next-btn') as HTMLButtonElement;
  const icon = btn.querySelector('.icon') as HTMLElement;

  // Hover: mũi tên → quả địa cầu 🌍
  btn.addEventListener('mouseenter', () => {
    icon.textContent = '🌍';
    icon.classList.add('scale-125');
  });
  btn.addEventListener('mouseleave', () => {
    icon.textContent = '➤';
    icon.classList.remove('scale-125');
  });

  // Click event
  btn.addEventListener('click', () => {
    if (onClick) onClick();
    closeNotification();
  });

  // Tự động đóng
  const timeoutId = setTimeout(closeNotification, duration);

  function closeNotification() {
    clearTimeout(timeoutId);
    box.classList.add('animate-fadeOutCenter');
    container.classList.add('animate-fadeOutBg');
    setTimeout(() => container.remove(), 500);
  }
};
