import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

type GetRoomsAPIResponse = Array<{
  id: string;
  name: string;
}>;

export function CreateRoom() {
  const { data, isLoading } = useQuery<GetRoomsAPIResponse>({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms');
      const result = await response.json();

      return result;
    },
  });

  return (
    <div>
      {isLoading && <p>Carregando...</p>}
      {data?.map((room) => {
        return (
          <Link key={room.id} to={`/room/${room.id}`}>
            {room.name}
          </Link>
        );
      })}
    </div>
  );
}
