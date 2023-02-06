// import { useRouter } from "next/router";
// import { useContext, useEffect } from "react";
// import { userContext } from "../modules/context/userContext";

// const Firewall = ({ children }) => {
//   const { user } = useContext(userContext);
//   const router = useRouter();

//   useEffect(() => {
//     if (!user) {
//       router.replace('/login');
//     }
//   }, [user]);

//   return user ? children : <></>;
// }

// export default Firewall;
