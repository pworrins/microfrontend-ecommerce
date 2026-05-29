import { Subject } from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

// SINGLE GLOBAL SUBJECT
const notificationSubject = new Subject<Notification>();

export const notifications$ = notificationSubject.asObservable();

export const notify = (
  type: Notification['type'],
  message: string,
  duration = 3000
): void => {
  console.log('NOTIFY EMITTED:', message);

  notificationSubject.next({
    id: Date.now().toString(),
    type,
    message,
    duration,
  });
};