import { create } from 'zustand';
import { mockNotifications } from '@/lib/mock-data';
import type { Notification } from '@/types';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter(n => !n.read).length,

  markAsRead: (id: string) =>
    set(state => {
      const notifications = state.notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      );
      return { notifications, unreadCount: notifications.filter(n => !n.read).length };
    }),

  markAllAsRead: () =>
    set(state => ({
      notifications: state.notifications.map(n => ({ ...n, read: true })),
      unreadCount: 0,
    })),

  removeNotification: (id: string) =>
    set(state => {
      const notifications = state.notifications.filter(n => n.id !== id);
      return { notifications, unreadCount: notifications.filter(n => !n.read).length };
    }),

  addNotification: (notification) =>
    set(state => {
      const newNotif: Notification = {
        ...notification,
        id: `nf-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      const notifications = [newNotif, ...state.notifications];
      return { notifications, unreadCount: notifications.filter(n => !n.read).length };
    }),
}));
