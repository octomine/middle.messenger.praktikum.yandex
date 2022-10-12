import { Indexed } from '@store';

export interface CurrentChatData {
  id: string;
  title: string;
  avatar: string | null;
  created_by: number;
  unread_count: number;
  last_message: Indexed | null;
}
