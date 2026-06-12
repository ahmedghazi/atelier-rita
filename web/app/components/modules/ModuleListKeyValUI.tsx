// import React from "react";
// import portableTextComponents from "@/app/sanity-api/portableTextComponents";
// import { _localizeField } from "@/app/sanity-api/utils";
// import { ListKeyValUI } from "@/app/types/schema";
// import { PortableText } from "next-sanity";
// import { motion } from "framer-motion";

// type Props = {
//   input: ListKeyValUI;
// };

// const ModuleListKeyValUI = ({ input }: Props) => {
//   const { items } = input;

//   return (
//     <section className='module module--list-key-val-ui '>
//       <div className='bg-accent'>
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1, transition: { delay: 1, duration: 0 } }}>
//           <div className='scrollable hide-sb'>
//             <div className='inner'>
//               {items?.map((item, i) => (
//                 <div key={i} className='grid md:grid-cols-3 mb-1e'>
//                   <div className='key'>{item.key}</div>
//                   <div className='val'>
//                     <div className='text '>
//                       <PortableText
//                         value={_localizeField(item.val)}
//                         components={portableTextComponents}
//                       />
//                     </div>
//                     <div className='extra'>{item.extra}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default ModuleListKeyValUI;
