import dynamic from "next/dynamic";

export default dynamic(import("../../containers/Login"), {
    ssr: false
});
