import dynamic from "next/dynamic";

export default dynamic(import("../../containers/Post"), {
    ssr: false
});
