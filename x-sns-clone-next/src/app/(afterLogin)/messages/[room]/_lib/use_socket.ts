import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import { Socket, io } from "socket.io-client";

// 서버 컴포넌트에서는 socket io가 쓰이지 않도록 주의해야함
// 커스텀 훅 간에 공유할때는 어쩔 수 없이 이렇게 따로 빼서 관리
let socket: Socket | null;

export default function useSocket(): [Socket | null, () => void] {
  const { data: session } = useSession();

  const disconnect = useCallback(() => {
    // 웹 소켓 연결 종료
    socket?.disconnect();
    socket = null;
  }, []);

  useEffect(() => {
    if (!socket) {
      // io를 활용해서 서버와 웹소켓 연결하는 주소 작성
      socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`, {
        // 웹소켓이 없을때는 주기적으로 서버한테 새로운 데이터가 있는지 묻고 응답을 받았던 형태였음
        // 주기적으로 요청을 보내는 것을 HTTP 폴링이라고함

        // 폴링없이 웹소켓만 쓰겠다고 설정
        transports: ["websocket"],
      });

      socket.on("connect_error", (err) => {
        console.log(err);
        console.log(`connect_error due to ${err.message}`);
      });
    }
  }, [session]);

  // 로그인 해주기
  useEffect(() => {
    if (socket?.connected && session?.user?.email) {
      socket?.emit("login", { id: session?.user?.email });
    }
  }, [session]);

  return [socket, disconnect];
}
