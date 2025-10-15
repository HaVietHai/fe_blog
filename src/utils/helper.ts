import type React from "react";

type NotificationType = 'success' | 'error' | 'info';

const notificationIcons: Record<NotificationType, string> = {
    success: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
};

const notificationTypeClasses: Record<NotificationType, { wrapper: string; icon: string }> = {
    success: {
        wrapper: 'bg-green-100 border-green-400',
        icon: 'text-green-500',
    },
    error: {
        wrapper: 'bg-red-100 border-red-400',
        icon: 'text-red-500',
    },
    info: {
        wrapper: 'bg-blue-100 border-blue-400',
        icon: 'text-blue-500',
    },
};


export const showNotification = ({type, message, duration = 5000}: {type: NotificationType, message: string, duration?: number}) => {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const notification = document.createElement('div');
    const classes = notificationTypeClasses[type];
    
    notification.className = `relative w-full p-4 border-l-4 rounded-lg shadow-lg flex items-start gap-3 ${classes.wrapper} animate-slideIn`;
    notification.setAttribute('role', 'alert');

    notification.innerHTML = `
        <div class="flex-shrink-0 ${classes.icon}" aria-hidden="true">${notificationIcons[type]}</div>
        <div class="flex-grow text-sm text-slate-700 pr-4">${message}</div>
        <button class="notification-close absolute top-1.5 right-2 text-slate-400 hover:text-slate-600 text-2xl leading-none" aria-label="Đóng">&times;</button>
    `;

    container.appendChild(notification);

    const closeButton = notification.querySelector('.notification-close') as HTMLButtonElement;
    
    let isClosing = false;
    const closeNotification = () => {
        if (isClosing) return;
        isClosing = true;

        clearTimeout(timeoutId);
        notification.classList.remove('animate-slideIn');
        notification.classList.add('animate-fadeOut');
        notification.addEventListener('animationend', () => {
            notification.remove();
        }, { once: true });
        setTimeout(() => notification.remove(), 400)
    };
    
    const timeoutId = setTimeout(closeNotification, duration);

    closeButton.addEventListener('click', closeNotification, { once: true });
};

export const readImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return Promise.reject('No file selected');
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
};

export const quickTimeToDate = (quickTime: string) => {
    const now = new Date();
    let start: Date;
    let end = new Date(now);

    switch (quickTime) {
        case 'today':
            start = new Date(now.setHours(0, 0, 0, 0));
            end.setHours(0, 0, 0, 0);
            break;
        case 'yesterday':
            start = new Date(now.setDate(now.getDate() - 1));
            start.setHours(0, 0, 0, 0);
            end = new Date(now.setDate(now.getDate() + 1));
            end.setHours(0, 0, 0, 0);
            break;
        case 'last7days':
            start = new Date(now);
            start.setHours(0, 0, 0, 0);
            start = new Date(start.setDate(start.getDate() - 7));
            end.setHours(0, 0, 0, 0);
            break;
        case 'thisWeek':
            start = new Date(now);
            start.setDate(now.getDate() - now.getDay());
            start.setHours(0, 0, 0, 0);
            break;
        case 'lastWeek':
            start = new Date(now);
            start.setDate(now.getDate() - now.getDay() - 7);
            start.setHours(0, 0, 0, 0);
            end = new Date(start);
            end.setDate(start.getDate() + 6);
            end.setHours(23, 59, 59, 999);
            break;
        case 'thisMonth':
            start = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case 'lastMonth':
            start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
            break;
        case 'thisQuarter':
            const quarter = Math.floor(now.getMonth() / 3);
            start = new Date(now.getFullYear(), quarter * 3, 1);
            break;
        case 'lastQuarter':
            const lastQuarter = Math.floor(now.getMonth() / 3) - 1;
            start = new Date(now.getFullYear(), lastQuarter * 3, 1);
            end = new Date(now.getFullYear(), (lastQuarter + 1) * 3, 0, 23, 59, 59, 999);
            break;
        case 'thisYear':
            start = new Date(now.getFullYear(), 0, 1);
            break;
        case 'lastYear':
            start = new Date(now.getFullYear() - 1, 0, 1);
            end = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999);
            break;
        default:
            start = new Date(now.setHours(0, 0, 0, 0));
    }
    return {start, end};
};

export const roundTo = (num: number, decimals: number) => {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

export function timeAgo(date: any) {
    let now: Date = new Date();
    const seconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return interval + " năm trước";
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + " tháng trước";
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return interval + " ngày trước";
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return interval + " giờ trước";
    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + " phút trước";
    return seconds + " giây trước";
}