import { useQuery } from '@tanstack/react-query';
import type { GetRoomQuestionsReponse } from './types/get-room-questions-response';

export function useRoomQuestions(roomId: string) {
  return useQuery<GetRoomQuestionsReponse>({
    queryKey: ['get-questions', roomId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`
      );
      const result = await response.json();

      return result;
    },
  });
}
