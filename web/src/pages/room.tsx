import { Navigate, useParams } from 'react-router-dom';

type RoomParams = {
  roomId: string;
};

export function Room() {
  const { roomId } = useParams<RoomParams>();

  if (!roomId) {
    <Navigate replace to="/" />;
  }
  return (
    <div>
      <p>{roomId}</p>
    </div>
  );
}
