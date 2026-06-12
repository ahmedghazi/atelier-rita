// import MuxPlayer from "@mux/mux-player-react";
// import React, { useEffect, useState } from "react";

// type Props = {
//   playbackId: string;
//   title?: string;
// };

// const MuxVideoPlayer = ({ playbackId, title }: Props) => {
//   const [ready, setReady] = useState<boolean>(false);

//   useEffect(() => {
//     setReady(true);
//   }, []);

//   return (
//     <div className='mux-player-container'>
//       {ready && (
//         <MuxPlayer
//           playbackId={playbackId}
//           metadata={title ? { video_title: title } : undefined}
//           autoPlay='muted'
//           loop
//         />
//       )}
//     </div>
//   );
// };

// export default MuxVideoPlayer;
