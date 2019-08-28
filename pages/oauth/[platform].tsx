import dynamic from "next/dynamic";

export default dynamic(import("../../containers/OAuth"), {
    ssr: false
});
