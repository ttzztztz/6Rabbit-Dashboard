import dynamic from "next/dynamic";

export default dynamic(import("../../containers/Profile"), {
    ssr: false
});
